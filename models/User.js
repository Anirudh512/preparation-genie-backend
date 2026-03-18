const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true }, // Contact only
    pin: { type: String, required: true }, // In a real app, hash this!
    name: { type: String, required: true },
    rollNo: { type: String, required: true },
    branch: { type: String, required: true },
    section: { type: String, required: true },
    securityQuestion: { type: String, required: true },
    securityAnswer: { type: String, required: true }, // Store lowercase for easy comparison

    // Profile Stats
    achievements: [{ type: String }],
    progress: { type: Number, default: 0 },
    coins: {
        type: Number,
        default: 0
    },
    ownedTitles: [{
        type: String
    }],
    activeTitle: {
        type: String,
        default: 'Novice'
    },
    streak: {
        type: Number,
        default: 0
    },
    maxStreak: {
        type: Number,
        default: 0
    },
    streakFreezes: {
        type: Number,
        default: 0
    },
    lastActiveDate: {
        type: Date
    },
    // Daily Quests Tracker (Reset daily)
    activeQuests: [{
        id: String,
        title: String,
        target: Number,
        progress: { type: Number, default: 0 },
        reward: Number,
        questType: String,
        claimed: { type: Boolean, default: false }
    }],
    lastQuestResetDate: { type: Date },
    testsCompleted: { type: Number, default: 0 },
    readUnits: [{ type: String }], // Track unique unit IDs read

    // Test History
    testHistory: [{
        testId: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' }, // Optional ref
        subject: String,
        unit: String,
        score: Number,
        totalQuestions: Number,
        date: { type: Date, default: Date.now }
    }],

    // Gamification
    // testsCompleted and achievements are already defined above
    equippedTitle: { type: String, default: "" }, // ID of the equipped title
    unlockedTitles: [{ type: String }], // IDs of unlocked titles
    claimedAchievements: [{ type: String }], // IDs of achievements claimed by user
    coins: { type: Number, default: 0 }, // ** NEW VIRTUAL ECONOMY FIELD **

    // Login Streak
    lastLoginDate: { type: Date, default: null },
    loginStreak: { type: Number, default: 0 },
});

module.exports = mongoose.model('User', UserSchema);
