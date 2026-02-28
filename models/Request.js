const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    type: { type: String, enum: ['deletion', 'feedback'], required: true },
    username: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'resolved'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
