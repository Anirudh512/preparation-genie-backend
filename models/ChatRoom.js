const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    messageId: { type: String, required: true },
    senderUsername: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String, default: null }, // Base64 encoded image string
    isEdited: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

const chatRoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true },
    history: [messageSchema], 
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ChatRoom', chatRoomSchema);
