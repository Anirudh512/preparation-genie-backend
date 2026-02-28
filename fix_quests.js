require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/preparation_genie';

async function fixQuests() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ MongoDB Connected');

        const result = await User.updateMany({}, {
            $set: { activeQuests: [] },
            $unset: { lastQuestResetDate: "" }
        });

        console.log(`✅ Quests reset for ${result.modifiedCount} users.`);
    } catch (err) {
        console.error('❌ Error:', err);
    } finally {
        mongoose.connection.close();
    }
}

fixQuests();
