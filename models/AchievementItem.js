const mongoose = require('mongoose');

const achievementItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    hint: {
        type: String,
        required: true
    },
    req: {
        type: Number,
        required: true // Requirement target (e.g. 5)
    }
});

// We can seed 3 defaults
module.exports = mongoose.model('AchievementItem', achievementItemSchema);
