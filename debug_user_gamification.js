const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/preparation_genie')
    .then(() => {
        console.log('MongoDB Connected');
        checkUser();
    })
    .catch(err => console.log(err));

const checkUser = async () => {
    try {
        const username = 'Anirudh_J';
        const user = await User.findOne({ username });

        if (!user) {
            console.log(`User ${username} not found!`);
            // Try finding ANY user
            const anyUser = await User.findOne({});
            if (anyUser) {
                console.log(`Found user: ${anyUser.username}`);
                inspect(anyUser);
            }
        } else {
            console.log(`Found user: ${username}`);
            inspect(user);
        }

    } catch (err) {
        console.error(err);
    } finally {
        // Don't close immediately if async work needed, but here it's sync inspection
        setTimeout(() => process.exit(0), 1000);
    }
};

function inspect(user) {
    console.log('--- GAMIFICATION DEBUG ---');
    console.log(`Completed Achievements (IDs): ${user.achievements.length}`);
    console.log(`Claimed Achievements (IDs):   ${user.claimedAchievements.length}`);
    console.log(`Unlocked Titles (${user.unlockedTitles.length}):`);
    console.log(user.unlockedTitles);
    console.log(`Equipped Title: '${user.equippedTitle}'`);

    // Check for specific IDs
    const hasMythic = user.unlockedTitles.includes('title_09');
    const hasConquerer = user.unlockedTitles.includes('title_10');

    console.log(`Has MYTHIC (title_09)? ${hasMythic}`);
    console.log(`Has CONQUERER (title_10)? ${hasConquerer}`);

    // Check duplicates in claimed
    const uniqueClaimed = new Set(user.claimedAchievements);
    console.log(`Unique Claimed Count: ${uniqueClaimed.size}`);

    // Check duplicates in unlocked
    const uniqueTitles = new Set(user.unlockedTitles);
    console.log(`Unique Titles Count: ${uniqueTitles.size}`);
}
