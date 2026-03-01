require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Add HTTP
const { Server } = require('socket.io'); // Add Socket.io

const app = express();
const server = http.createServer(app); // Wrap express with HTTP server
const PORT = process.env.PORT || 5000;

// Setup Socket.io
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for dev
        methods: ["GET", "POST"]
    }
});

const activeStudyRooms = {}; // { subjectName: { socketId: { username, joinedAt } } }
const globalOnlineUsers = {}; // { socketId: username }
const usernameToSocket = {}; // { username: socketId }

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
    console.log(`🔌 New client connected: ${socket.id}`);

    // Track user globally returning online status
    socket.on('set_online', (username) => {
        globalOnlineUsers[socket.id] = username;
        usernameToSocket[username] = socket.id;
        console.log(`🟢 ${username} is now online (Global)`);
        io.emit('user_status_change', { username, isOnline: true });
    });

    // Join a Study Room
    socket.on('join_study_room', (data) => {
        const { username, subject } = data;
        if (!activeStudyRooms[subject]) {
            activeStudyRooms[subject] = {};
        }
        activeStudyRooms[subject][socket.id] = { socketId: socket.id, username, joinedAt: new Date() };
        console.log(`📚 ${username} joined Study Room: ${subject}`);

        // Broadcast updated room list
        io.emit('study_room_update', { subject, users: Object.values(activeStudyRooms[subject]) });
    });

    // Leave a Study Room
    socket.on('leave_study_room', (data) => {
        const { subject } = data;
        if (activeStudyRooms[subject] && activeStudyRooms[subject][socket.id]) {
            const username = activeStudyRooms[subject][socket.id].username;
            delete activeStudyRooms[subject][socket.id];
            console.log(`💨 ${username} left Study Room: ${subject}`);
            io.emit('study_room_update', { subject, users: Object.values(activeStudyRooms[subject]) });
        }
    });

    // Listen for new test submissions to broadcast to leaderboard
    socket.on('test_completed', (data) => {
        console.log(`🏆 Test completed by ${data.username}, Score: ${data.score}`);
        // Broadcast to everyone else
        socket.broadcast.emit('live_leaderboard_update', data);
    });

    // Live Doubt Forum Chat (with abusive word filter)
    socket.on('new_doubt_message', (messageData) => {
        console.log(`💬 New Doubt from ${messageData.author}`);

        // Filter out abusive words
        const cleanedText = filterMessage(messageData.text);
        messageData.text = cleanedText;

        // Broadcast immediately back to all clients
        io.emit('doubt_message_receive', messageData);
    });

    // --- PRIVATE CHAT ROOMS & STUDY REQUESTS ---
    const activeChatRooms = {}; // roomId -> { users: Set<socketId>, maxEver: number }

    socket.on('send_study_request', (data) => {
        // data: { targetUsername, senderUsername, requestType, subject, roomId (optional) }
        const targetSocketId = usernameToSocket[data.targetUsername];
        if (targetSocketId) {
            io.to(targetSocketId).emit('receive_study_request', {
                senderSocketId: socket.id,
                senderUsername: data.senderUsername,
                requestType: data.requestType,
                subject: data.subject,
                roomId: data.roomId
            });
        }
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
            senderSocketId: data.senderSocketId
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
    socket.on('join_private_room', (data) => {
        // data: { roomId, username }
        socket.join(data.roomId);
        if (!activeChatRooms[data.roomId]) {
            activeChatRooms[data.roomId] = { users: new Set(), maxEver: 0, history: [] };
        }
        activeChatRooms[data.roomId].users.add(socket.id);

        if (activeChatRooms[data.roomId].users.size > activeChatRooms[data.roomId].maxEver) {
            activeChatRooms[data.roomId].maxEver = activeChatRooms[data.roomId].users.size;
        }

        // Emit existing chat history to the newly joined user
        socket.emit('receive_chat_history', {
            history: activeChatRooms[data.roomId].history
        });

        socket.to(data.roomId).emit('user_joined_room', {
            username: data.username,
            timestamp: new Date().toISOString()
        });
    });

    socket.on('leave_private_room', (data) => {
        // data: { roomId, username }
        socket.leave(data.roomId);
        if (activeChatRooms[data.roomId]) {
            activeChatRooms[data.roomId].users.delete(socket.id);

            socket.to(data.roomId).emit('user_left_room', {
                username: data.username,
                timestamp: new Date().toISOString()
            });

            const currentSize = activeChatRooms[data.roomId].users.size;
            const maxEver = activeChatRooms[data.roomId].maxEver;

            if (currentSize === 1 && maxEver >= 2) {
                io.to(data.roomId).emit('chat_dismantled', { reason: 'Not enough members' });
            } else if (currentSize === 0) {
                delete activeChatRooms[data.roomId];
            }
        }
    });

    // Messaging & Receipts
    socket.on('direct_message', (data) => {
        // data: { roomId, senderUsername, text }
        const cleanedText = filterMessage(data.text);

        const messageObject = {
            senderSocketId: socket.id,
            senderUsername: data.senderUsername,
            text: cleanedText,
            timestamp: new Date().toISOString()
        };

        if (activeChatRooms[data.roomId]) {
            activeChatRooms[data.roomId].history.push(messageObject);
            if (activeChatRooms[data.roomId].history.length > 50) {
                activeChatRooms[data.roomId].history.shift(); // Keep last 50 messages
            }
        }

        socket.to(data.roomId).emit('receive_direct_message', messageObject);
    });

    socket.on('typing', (data) => {
        socket.to(data.roomId).emit('user_typing', { username: data.username });
    });

    socket.on('stop_typing', (data) => {
        socket.to(data.roomId).emit('user_stop_typing', { username: data.username });
    });

    socket.on('mark_seen', (data) => {
        socket.to(data.roomId).emit('message_seen', {
            username: data.username,
            timestamp: new Date().toISOString()
        });
    });

    // Also export global online check
    socket.on('get_online_users', () => {
        socket.emit('online_users_list', Object.values(globalOnlineUsers));
    });

    socket.on('disconnect', () => {
        console.log(`🔌 Client disconnected: ${socket.id}`);

        // Handle quitting any active chat rooms without explicit leave
        for (const roomId in activeChatRooms) {
            if (activeChatRooms[roomId].users.has(socket.id)) {
                activeChatRooms[roomId].users.delete(socket.id);

                const currentSize = activeChatRooms[roomId].users.size;
                const maxEver = activeChatRooms[roomId].maxEver;

                // Find username if possible to broadcast name
                const username = Object.keys(usernameToSocket).find(key => usernameToSocket[key] === socket.id);
                if (username) {
                    io.to(roomId).emit('user_left_room', {
                        username: username,
                        timestamp: new Date().toISOString()
                    });
                }

                if (currentSize === 1 && maxEver >= 2) {
                    io.to(roomId).emit('chat_dismantled', { reason: 'Partner Disconnected' });
                } else if (currentSize === 0) {
                    delete activeChatRooms[roomId];
                }
            }
        }

        const username = globalOnlineUsers[socket.id];
        if (username) {
            delete globalOnlineUsers[socket.id];
            delete usernameToSocket[username];
            console.log(`🔴 ${username} went offline`);
            io.emit('user_status_change', { username, isOnline: false });
        }

        // Remove from any active study rooms
        for (const subject in activeStudyRooms) {
            if (activeStudyRooms[subject][socket.id]) {
                delete activeStudyRooms[subject][socket.id];
                console.log(`👀 Cleaned up ${username || 'Unknown'} from ${subject}`);
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

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const testRoutes = require('./routes/tests');
const adminRoutes = require('./routes/admin');
const notificationRoutes = require('./routes/notifications'); // New Notification Route
const aiRoutes = require('./routes/ai'); // New AI Route

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/tests', testRoutes);
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
    console.log(`🚀 Server and WebSockets running on http://localhost:${PORT}`);
});
