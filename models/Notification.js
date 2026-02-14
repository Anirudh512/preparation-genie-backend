const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['info', 'alert', 'update', 'admin_message'],
        default: 'info',
    },
    date: {
        type: Date,
        default: Date.now,
    },
    target: {
        type: String, // 'all', 'user', 'branch'
        default: 'all',
    },
    targetValue: {
        type: String, // username or branch name if target is specific
        default: null,
    },
    readBy: [{
        type: String // array of usernames who have read this notification
    }]
});

module.exports = mongoose.model('Notification', NotificationSchema);
