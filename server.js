require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Add HTTP
const path = require('path');
const { Server } = require('socket.io'); // Add Socket.io
const ChatRoom = require('./models/ChatRoom');

const app = express();
const server = http.createServer(app); // Wrap express with HTTP server
const PORT = process.env.PORT || 5000;
app.set('trust proxy', true);

// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for dev
        methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 1e8 // Allow 100MB payload for images
});

const activeStudyRooms = {}; // { subjectName: { socketId: { username, joinedAt } } }
const userSockets = {}; // { username: Set<socketId> }
const socketToUser = {}; // { socketId: username }
const activeChatRooms = {}; // roomId -> { users:Set<socketId>, usernames:Set<string>, maxEver:number, history:[] }
const socketRooms = {}; // socketId -> Set<roomId>

// Simple profanity filter
const abusiveWords = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'pussy', 'whore', 'slut', 'idiot', 'stupid', 'bastard'];
const filterMessage = (text) => {
    let filtered = text;
    abusiveWords.forEach(word => {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        filtered = filtered.replace(regex, '*'.repeat(word.length));
    });
    return filtered;
};

// Socket.io Connection Logic
io.on('connection', (socket) => {
    console.log(`ðŸ”Œ New client connected: ${socket.id}`);

    // Track user globally returning online status
    socket.on('set_online', (username) => {
        if (!username) return;

        socketToUser[socket.id] = username;
        if (!userSockets[username]) {
            userSockets[username] = new Set();
        }
        
        userSockets[username].add(socket.id);
        socket.join(username); // Join a personal room for direct routing
        
        console.log(`ðŸŸ¢ ${username} is now online (Sockets: ${userSockets[username].size})`);

        if (userSockets[username].size === 1) {
            // Only broadcast if it's their first active connection
            io.emit('user_status_change', { username, isOnline: true });
        }

        // Send current list instantly
        socket.emit('online_users_list', Object.keys(userSockets));
    });

    // Join a Study Room
    socket.on('join_study_room', (data) => {
        const { username, subject } = data;
        if (!activeStudyRooms[subject]) {
            activeStudyRooms[subject] = {};
        }
        activeStudyRooms[subject][socket.id] = { socketId: socket.id, username, joinedAt: new Date() };
        console.log(`ðŸ“š ${username} joined Study Room: ${subject}`);

        // Broadcast updated room list
        io.emit('study_room_update', { subject, users: Object.values(activeStudyRooms[subject]) });
    });

    // Leave a Study Room
    socket.on('leave_study_room', (data) => {
        const { subject } = data;
        if (activeStudyRooms[subject] && activeStudyRooms[subject][socket.id]) {
            const username = activeStudyRooms[subject][socket.id].username;
            delete activeStudyRooms[subject][socket.id];
            console.log(`ðŸ’¨ ${username} left Study Room: ${subject}`);
            io.emit('study_room_update', { subject, users: Object.values(activeStudyRooms[subject]) });
        }
    });

    // Listen for new test submissions to broadcast to leaderboard
    socket.on('test_completed', (data) => {
        console.log(`ðŸ† Test completed by ${data.username}, Score: ${data.score}`);
        // Broadcast to everyone else
        socket.broadcast.emit('live_leaderboard_update', data);
    });

    // Live Doubt Forum Chat (with abusive word filter)
    socket.on('new_doubt_message', (messageData) => {
        console.log(`ðŸ’¬ New Doubt from ${messageData.author}`);

        // Filter out abusive words
        const cleanedText = filterMessage(messageData.text);
        messageData.text = cleanedText;

        // Broadcast immediately back to all clients
        io.emit('doubt_message_receive', messageData);
    });

    const addSocketRoom = (sid, roomId) => {
        if (!socketRooms[sid]) socketRooms[sid] = new Set();
        socketRooms[sid].add(roomId);
    };
    const removeSocketRoom = (sid, roomId) => {
        if (socketRooms[sid]) {
            socketRooms[sid].delete(roomId);
            if (socketRooms[sid].size === 0) delete socketRooms[sid];
        }
    };
    const disbandRoom = (roomId, reasonMessage) => {
        const room = activeChatRooms[roomId];
        if (!room) return;
        io.in(roomId).emit('chat_dismantled', {
            roomId,
            message: reasonMessage || 'This chat has been closed.',
            timestamp: new Date().toISOString()
        });
        room.users.forEach((sid) => {
            const s = io.sockets.sockets.get(sid);
            if (s) {
                s.leave(roomId);
                removeSocketRoom(sid, roomId);
            }
        });
        delete activeChatRooms[roomId];
    };

    socket.on('send_study_request', (data) => {
        // data: { targetUsername, senderUsername, requestType, subject, roomId (optional) }
        io.to(data.targetUsername).emit('receive_study_request', {
            senderSocketId: socket.id,
            senderUsername: data.senderUsername,
            requestType: data.requestType,
            subject: data.subject,
            roomId: data.roomId
        });
    });

    socket.on('accept_study_request', (data) => {
        // data: { senderSocketId, responderUsername, subject, roomId (optional) }
        const roomId = data.roomId || `room_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;

        // Notify original sender that their invite was accepted
        io.to(data.senderSocketId).emit('study_request_accepted', {
            responderSocketId: socket.id,
            responderUsername: data.responderUsername,
            subject: data.subject,
            roomId: roomId
        });

        // Notify responder of the room ID so they can join it
        socket.emit('study_request_accepted_self', {
            roomId: roomId,
            subject: data.subject,
            senderSocketId: data.senderSocketId,
            senderUsername: socketToUser[data.senderSocketId] || null
        });
    });

    socket.on('reject_study_request', (data) => {
        // data: { senderSocketId, responderUsername }
        // The frontend sends senderSocketId explicitly
        if (data.senderSocketId) {
            io.to(data.senderSocketId).emit('study_request_rejected', {
                responderUsername: data.responderUsername
            });
        } else if (data.targetSocketId) {
            // Fallback for old study_room_page.dart implementation
            io.to(data.targetSocketId).emit('study_request_rejected', {
                responderUsername: data.responderUsername
            });
        }
    });

    // Room Management
    socket.on('join_private_room', async (data) => {
        // data: { roomId, username, historyLimit?, includeMissed? }
        const roomId = data.roomId;
        const username = data.username;
        const historyLimit = Math.max(1, Math.min(1000, Number(data.historyLimit) || 1000));
        socket.join(roomId);
        addSocketRoom(socket.id, roomId);
        if (!activeChatRooms[roomId]) {
            activeChatRooms[roomId] = { users: new Set(), usernames: new Set(), maxEver: 0, history: [] };
            
            try {
                let dbRoom = await ChatRoom.findOne({ roomId });
                if (dbRoom) {
                    activeChatRooms[roomId].history = dbRoom.history;
                }
            } catch (err) { 
                console.error("Error fetching ChatRoom from DB", err); 
            }
        }
        activeChatRooms[roomId].users.add(socket.id);
        if (username) activeChatRooms[roomId].usernames.add(username);

        if (activeChatRooms[roomId].users.size > 4) {
            activeChatRooms[roomId].users.delete(socket.id);
            if (username) activeChatRooms[roomId].usernames.delete(username);
            socket.leave(roomId);
            removeSocketRoom(socket.id, roomId);
            socket.emit('room_join_error', {
                roomId,
                message: 'Room is full. Maximum 4 members allowed.'
            });
            return;
        }

        if (activeChatRooms[roomId].users.size > activeChatRooms[roomId].maxEver) {
            activeChatRooms[roomId].maxEver = activeChatRooms[roomId].users.size;
        }

        // Emit existing chat history to the newly joined user
        socket.emit('receive_chat_history', {
            roomId,
            history: activeChatRooms[roomId].history.slice(-historyLimit)
        });

        socket.to(roomId).emit('user_joined_room', {
            roomId,
            username: username,
            timestamp: new Date().toISOString()
        });
        io.in(roomId).emit('room_members_update', {
            roomId,
            members: Array.from(activeChatRooms[roomId].usernames),
            count: activeChatRooms[roomId].usernames.size
        });
    });

    socket.on('leave_private_room', (data) => {
        // data: { roomId, username, leaveType, requestDisbandIfPair }
        const roomId = data.roomId;
        const username = data.username;
        const leaveType = data.leaveType || 'temporary';
        socket.leave(roomId);
        removeSocketRoom(socket.id, roomId);
        if (activeChatRooms[roomId]) {
            activeChatRooms[roomId].users.delete(socket.id);
            if (username) activeChatRooms[roomId].usernames.delete(username);

            socket.to(roomId).emit('user_left_room', {
                roomId,
                username: username,
                timestamp: new Date().toISOString()
            });

            const currentSize = activeChatRooms[roomId].users.size;
            const shouldDisbandPair =
                leaveType === 'permanent' &&
                data.requestDisbandIfPair === true &&
                activeChatRooms[roomId].maxEver <= 2;

            if (shouldDisbandPair) {
                disbandRoom(roomId, `${username} exited chat. Room disbanded.`);
                return;
            }
            if (currentSize === 0) {
                // keep history in DB; remove memory room to prevent leaks
                delete activeChatRooms[roomId];
                return;
            }
            io.in(roomId).emit('room_members_update', {
                roomId,
                members: Array.from(activeChatRooms[roomId].usernames),
                count: activeChatRooms[roomId].usernames.size
            });
        }
    });

    // Messaging & Receipts
    socket.on('direct_message', async (data) => {
        // data: { messageId, roomId, senderUsername, text, imageUrl (optional) }
        if (!data || !data.roomId || !activeChatRooms[data.roomId]) return;
        if (!activeChatRooms[data.roomId].users.has(socket.id)) return;
        if (data.text && data.text.length > 1000) return;

        const cleanedText = data.text ? filterMessage(data.text) : "";

        const messageObject = {
            messageId: data.messageId || Date.now().toString(),
            senderSocketId: socket.id,
            senderUsername: data.senderUsername,
            text: cleanedText,
            imageUrl: data.imageUrl || null,
            isEdited: false,
            isDeleted: false,
            timestamp: new Date().toISOString()
        };

        if (activeChatRooms[data.roomId]) {
            activeChatRooms[data.roomId].history.push(messageObject);
            if (activeChatRooms[data.roomId].history.length > 1000) {
                activeChatRooms[data.roomId].history.shift(); // Keep last 1000 messages
            }
        }

        try {
            await ChatRoom.findOneAndUpdate(
                { roomId: data.roomId },
                { $push: { history: { $each: [messageObject], $slice: -1000 } } },
                { upsert: true }
            );
        } catch(e) { 
            console.error("Error saving chat message to DB", e); 
        }

        io.in(data.roomId).emit('receive_direct_message', {
            ...messageObject,
            roomId: data.roomId
        });
        socket.emit('message_ack', {
            roomId: data.roomId,
            messageId: messageObject.messageId,
            timestamp: new Date().toISOString()
        });
    });

    socket.on('edit_message', async (data) => {
        // data: { roomId, messageId, newText }
        const cleanedText = data.newText ? filterMessage(data.newText) : "";

        // Update in RAM
        if (activeChatRooms[data.roomId]) {
            const msgObj = activeChatRooms[data.roomId].history.find(m => m.messageId === data.messageId);
            if (msgObj) {
                msgObj.text = cleanedText;
                msgObj.isEdited = true;
            }
        }

        // Notify Clients
        io.in(data.roomId).emit('message_edited', {
            roomId: data.roomId,
            messageId: data.messageId,
            newText: cleanedText
        });

        // Update in MongoDB
        try {
            await ChatRoom.findOneAndUpdate(
                { roomId: data.roomId, "history.messageId": data.messageId },
                { 
                    $set: { 
                        "history.$.text": cleanedText,
                        "history.$.isEdited": true
                    } 
                }
            );
        } catch(e) { console.error("Error editing message in DB", e); }
    });

    socket.on('delete_message', async (data) => {
        // data: { roomId, messageId }
        
        // Update in RAM
        if (activeChatRooms[data.roomId]) {
            const msgObj = activeChatRooms[data.roomId].history.find(m => m.messageId === data.messageId);
            if (msgObj) {
                msgObj.isDeleted = true;
                msgObj.text = "ðŸš« This message was deleted.";
                msgObj.imageUrl = null;
            }
        }

        // Notify Clients
        io.in(data.roomId).emit('message_deleted', {
            roomId: data.roomId,
            messageId: data.messageId
        });

        // Update in MongoDB
        try {
            await ChatRoom.findOneAndUpdate(
                { roomId: data.roomId, "history.messageId": data.messageId },
                { 
                    $set: { 
                        "history.$.isDeleted": true,
                        "history.$.text": "ðŸš« This message was deleted.",
                        "history.$.imageUrl": null
                    } 
                }
            );
        } catch(e) { console.error("Error deleting message in DB", e); }
    });

    socket.on('typing', (data) => {
        socket.to(data.roomId).emit('user_typing', { roomId: data.roomId, username: data.username });
    });

    socket.on('stop_typing', (data) => {
        socket.to(data.roomId).emit('user_stop_typing', { roomId: data.roomId, username: data.username });
    });

    socket.on('mark_seen', (data) => {
        socket.to(data.roomId).emit('message_seen', {
            roomId: data.roomId,
            username: data.username,
            timestamp: new Date().toISOString()
        });
    });

    // Also export global online check
    socket.on('get_online_users', () => {
        socket.emit('online_users_list', Object.keys(userSockets));
    });

    socket.on('disconnect', () => {
        console.log(`ðŸ”Œ Client disconnected: ${socket.id}`);

        // Handle quitting any active chat rooms without explicit leave
        const rooms = socketRooms[socket.id] ? Array.from(socketRooms[socket.id]) : [];
        for (const roomId of rooms) {
            if (!activeChatRooms[roomId]) continue;
            activeChatRooms[roomId].users.delete(socket.id);
            const username = socketToUser[socket.id];
            if (username) {
                activeChatRooms[roomId].usernames.delete(username);
                io.to(roomId).emit('user_left_room', {
                    roomId,
                    username: username,
                    timestamp: new Date().toISOString()
                });
            }
            if (activeChatRooms[roomId].users.size === 0) {
                delete activeChatRooms[roomId];
            } else {
                io.in(roomId).emit('room_members_update', {
                    roomId,
                    members: Array.from(activeChatRooms[roomId].usernames),
                    count: activeChatRooms[roomId].usernames.size
                });
            }
            removeSocketRoom(socket.id, roomId);
        }

        const username = socketToUser[socket.id];
        if (username && userSockets[username]) {
            userSockets[username].delete(socket.id);
            delete socketToUser[socket.id];

            if (userSockets[username].size === 0) {
                delete userSockets[username];
                console.log(`ðŸ”´ ${username} went offline`);
                io.emit('user_status_change', { username, isOnline: false });
            } else {
                console.log(`âš ï¸ ${username} lost connection but remains online (Sockets: ${userSockets[username].size})`);
            }
        }

        // Remove from any active study rooms
        for (const subject in activeStudyRooms) {
            if (activeStudyRooms[subject][socket.id]) {
                delete activeStudyRooms[subject][socket.id];
                console.log(`ðŸ‘€ Cleaned up ${username || 'Unknown'} from ${subject}`);
                io.emit('study_room_update', { subject, users: Object.values(activeStudyRooms[subject]) });
            }
        }
    });
});

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// MongoDB Connection
// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/preparation_genie';

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection established');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB runtime error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
});

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
})
    .then(() => console.log('âœ… MongoDB Connected'))
    .catch(err => console.error('âŒ MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const profileDashboardRoutes = require('./routes/profileDashboard');
const testRoutes = require('./routes/tests');
const adminRoutes = require('./routes/admin');
const adminReleaseCenterRoutes = require('./routes/adminReleaseCenter');
const publicReleaseRoutes = require('./routes/publicReleases');
const notificationRoutes = require('./routes/notifications'); // New Notification Route
const aiRoutes = require('./routes/ai'); // New AI Route

app.use('/', publicReleaseRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', profileDashboardRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/admin', adminReleaseCenterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/ai', aiRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Preparation Genie Backend is Running!');
});

// DEBUG ROUTE (Temporary)
app.get('/api/debug-db', async (req, res) => {
    try {
        const state = mongoose.connection.readyState;
        const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

        // Try a simple DB operation
        const userCount = await mongoose.model('User').countDocuments();

        res.json({
            status: 'ok',
            dbState: states[state],
            userCount: userCount,
            envUri: process.env.MONGODB_URI ? 'Exists (Hidden)' : 'MISSING'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            error: err.message,
            stack: err.stack
        });
    }
});

server.listen(PORT, () => {
    console.log(`ðŸš€ Server and WebSockets running on http://localhost:${PORT}`);
});
