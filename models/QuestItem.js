const mongoose = require('mongoose');

const questItemSchema = new mongoose.Schema({
    setId: {
        type: Number,
        required: true // 1, 2, or 3
    },
    title: {
        type: String,
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    reward: {
        type: Number,
        required: true
    },
    questType: {
        type: String,
        required: true // e.g. 'tests', 'login', 'read'
    }
});

module.exports = mongoose.model('QuestItem', questItemSchema);
