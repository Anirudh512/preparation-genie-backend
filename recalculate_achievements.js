const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/preparation_genie')
    .then(() => {
        console.log('MongoDB Connected');
        recalculateUser();
    })
    .catch(err => console.log(err));

const recalculateUser = async () => {
    try {
        const username = 'Anirudh_J';
        const user = await User.findOne({ username });

        if (!user) {
            console.log(`User ${username} not found!`);
            process.exit(1);
        }

        console.log(`Recalculating achievements for ${username}...`);

        // 1. RESET
        user.achievements = [];
        user.claimedAchievements = [];
        user.unlockedTitles = [];
        user.equippedTitle = "";

        const validAchievements = [];

        // 2. ANALYZE HISTORY & STATS
        const history = user.testHistory || [];
        const totalTests = history.length;

        // ACH_01: Newbie (Always true if user exists)
        validAchievements.push('ach_01');

        // ACH_02: First Reader (Cannot verify from DB easily, skip or assuming false if no 'reads' tracked)
        // Leaving out for now.

        // ACH_03: First Attempt (If history > 0)
        if (totalTests > 0) validAchievements.push('ach_03');

        // ACH_04: First Finish (If history > 0)
        if (totalTests > 0) validAchievements.push('ach_04');

        // ACH_05: On Target (Score >= 50% in any test)
        const has50Percent = history.some(t => (t.score / t.totalQuestions) >= 0.5);
        if (has50Percent) validAchievements.push('ach_05');

        // ACH_06: Streak (Check user.streak if implemented, else skip)
        // Skipped.

        // ACH_08: Perfect Score (Score == Total)
        const hasPerfect = history.some(t => t.score === t.totalQuestions && t.totalQuestions > 0);
        if (hasPerfect) validAchievements.push('ach_08');

        // ACH_09: Quick Thinker (Time < 5 mins)
        // Need to check if 'timeTaken' exists in history
        const hasQuick = history.some(t => t.timeTaken && t.timeTaken < 300);
        if (hasQuick) validAchievements.push('ach_09');

        // ACH_10: Bronze Medal (70%+ in 3 tests)
        const count70 = history.filter(t => (t.score / t.totalQuestions) >= 0.7).length;
        if (count70 >= 3) validAchievements.push('ach_10');

        // ACH_13: Silver Medal (80%+ in 5 tests)
        const count80 = history.filter(t => (t.score / t.totalQuestions) >= 0.8).length;
        if (count80 >= 5) validAchievements.push('ach_13');

        // ACH_16: Gold Medal (90%+ in 5 tests)
        const count90 = history.filter(t => (t.score / t.totalQuestions) >= 0.9).length;
        if (count90 >= 5) validAchievements.push('ach_16');

        // ACH_26: Champion (90%+ in 10 tests)
        if (count90 >= 10) validAchievements.push('ach_26');

        // ACH_29: Machine (50 tests total)
        if (totalTests >= 50) validAchievements.push('ach_29');

        // ACH_31: Diamond (100% in 5 tests)
        const countPerfect = history.filter(t => t.score === t.totalQuestions && t.totalQuestions > 0).length;
        if (countPerfect >= 5) validAchievements.push('ach_31');

        // APPLY
        user.achievements = validAchievements;
        console.log(`Awarded ${validAchievements.length} valid achievements based on history.`);

        await user.save();
        console.log('SUCCESS: User profile recalculated.');
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
