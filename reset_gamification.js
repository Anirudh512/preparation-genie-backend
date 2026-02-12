const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/preparation_genie')
    .then(() => {
        console.log('MongoDB Connected');
        resetUser();
    })
    .catch(err => console.log(err));

const resetUser = async () => {
    try {
        const username = 'Anirudh_J';
        const user = await User.findOne({ username });

        if (!user) {
            console.log(`User ${username} not found!`);
            process.exit(1);
        }

        console.log(`Resetting gamification for ${username}...`);

        // RESET EVERYTHING
        user.achievements = [];
        user.claimedAchievements = [];
        user.unlockedTitles = [];
        user.equippedTitle = "";

        // RE-AWARD "Newbie" (ach_01) because they exist
        user.achievements.push('ach_01');
        console.log('Restored "Newbie" achievement (completed but unclaimed).');

        await user.save();
        console.log('SUCCESS: User profile reset to normal state.');
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
