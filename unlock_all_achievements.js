const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/preparation_genie')
    .then(() => {
        console.log('MongoDB Connected');
        unlockAll();
    })
    .catch(err => console.log(err));

const unlockAll = async () => {
    try {
        // Find ANY user (since there's only 1)
        const user = await User.findOne({});
        const username = user ? user.username : "Unknown";

        if (!user) {
            console.log(`User ${username} not found!`);
            process.exit(1);
        }

        // Generate 50 IDs: ach_01 to ach_50
        const allAchievements = [];
        for (let i = 1; i <= 50; i++) {
            allAchievements.push(`ach_${i.toString().padStart(2, '0')}`);
        }

        user.achievements = allAchievements; // All Completed
        user.claimedAchievements = [];      // None Claimed
        user.unlockedTitles = [];           // Reset Titles
        user.equippedTitle = "";            // Reset Equipped

        await user.save();
        console.log(`SUCCESS: User ${username} now has 50 COMPLETED (unclaimed) achievements.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
