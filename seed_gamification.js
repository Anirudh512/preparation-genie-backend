const mongoose = require('mongoose');
require('dotenv').config();
const QuestItem = require('./models/QuestItem');
const AchievementItem = require('./models/AchievementItem');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/prepgenie_prod')
    .then(async () => {
        console.log("Connected to MongoDB for Seeding");

        await QuestItem.deleteMany({});
        await AchievementItem.deleteMany({});

        // 3 Sets of 3 Quests
        const quests = [
            // SET 1
            { setId: 1, title: 'Take 1 Test', target: 1, reward: 50, questType: 'tests' },
            { setId: 1, title: 'Ask 1 Doubt', target: 1, reward: 25, questType: 'doubts' },
            { setId: 1, title: 'Review 10 Flashcards', target: 10, reward: 40, questType: 'flashcards' },

            // SET 2
            { setId: 2, title: 'Take 2 Tests', target: 2, reward: 100, questType: 'tests' },
            { setId: 2, title: 'Read 2 Units', target: 2, reward: 50, questType: 'read' },
            { setId: 2, title: 'Login Streak', target: 1, reward: 20, questType: 'login' },

            // SET 3
            { setId: 3, title: 'Take 3 Tests', target: 3, reward: 150, questType: 'tests' },
            { setId: 3, title: 'Ask 3 Doubts', target: 3, reward: 80, questType: 'doubts' },
            { setId: 3, title: 'Review 25 Flashcards', target: 25, reward: 100, questType: 'flashcards' },
        ];
        await QuestItem.insertMany(quests);

        // 3 Default Achievements without symbols
        const achievements = [
            { title: 'Newbie', hint: 'Register and login for the first time', req: 1 },
            { title: 'First Attempt', hint: 'Start your first test', req: 1 },
            { title: 'First Finish', hint: 'Complete and submit any test', req: 1 },
        ];
        await AchievementItem.insertMany(achievements);

        console.log("Seeding Complete!");
        process.exit(0);
    }).catch(err => {
        console.error("DB Error:", err);
        process.exit(1);
    });
