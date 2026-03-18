const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET PROFILE
router.get('/profile/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // SELF-CORRECTION: Check for missing title unlocks
        const claimedCount = user.claimedAchievements.length;
        const titlesToCheck = [
            { id: "title_01", req: 5 },
            { id: "title_02", req: 10 },
            { id: "title_03", req: 15 },
            { id: "title_04", req: 20 },
            { id: "title_05", req: 25 },
            { id: "title_06", req: 30 },
            { id: "title_07", req: 35 },
            { id: "title_08", req: 40 },
            { id: "title_09", req: 45 },
            { id: "title_10", req: 50 }
        ];

        let changed = false;
        titlesToCheck.forEach(t => {
            if (claimedCount >= t.req && !user.unlockedTitles.includes(t.id)) {
                user.unlockedTitles.push(t.id);
                changed = true;
            }
        });

        if (changed) {
            await user.save();
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET GLOBAL LEADERBOARD
router.get('/leaderboard', async (req, res) => {
    try {
        const users = await User.find({})
            .select('name username testsCompleted loginStreak coins progress equippedTitle')
            .lean();

        const rankedUsers = users.map(u => {
            const score =
                (u.testsCompleted || 0) * 100 +
                (u.loginStreak || 0) * 50 +
                (u.coins || 0) * 5 +
                (u.progress || 0) * 10;
            return { ...u, score: Math.round(score) };
        });

        rankedUsers.sort((a, b) => b.score - a.score);

        res.json(rankedUsers.slice(0, 100));
    } catch (err) {
        console.error("Leaderboard Error:", err.message);
        res.status(500).send('Server Error');
    }
});

// MARK UNIT AS READ
router.post('/read-unit', async (req, res) => {
    try {
        const { username, unitId } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Initialize readUnits if missing
        if (!user.readUnits) user.readUnits = [];

        // Add if unique
        if (!user.readUnits.includes(unitId)) {
            user.readUnits.push(unitId);
        }

        // CHECK READING ACHIEVEMENTS
        const count = user.readUnits.length;
        const newAchievements = [];

        // ach_02: First Reader (1 unit)
        if (count >= 1 && !user.achievements.includes('ach_02')) newAchievements.push('ach_02');

        // ach_07: Bookworm (5 units)
        if (count >= 5 && !user.achievements.includes('ach_07')) newAchievements.push('ach_07');

        // ach_28: Librarian (20 units)
        if (count >= 20 && !user.achievements.includes('ach_28')) newAchievements.push('ach_28');

        // ach_47: Loremaster (All/40 units)
        if (count >= 40 && !user.achievements.includes('ach_47')) newAchievements.push('ach_47');

        if (newAchievements.length > 0) {
            user.achievements.push(...newAchievements);
        }

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// UPDATE PROGRESS / ACHIEVEMENTS
router.post('/update-progress', async (req, res) => {
    try {
        const { username, progress, testsCompleted, achievements } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (progress !== undefined) user.progress = progress;
        if (testsCompleted !== undefined) user.testsCompleted = testsCompleted;
        if (achievements) {
            // Add new achievements, avoid duplicates
            achievements.forEach(ach => {
                if (!user.achievements.includes(ach)) {
                    user.achievements.push(ach);
                }
            });
        }

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE USER
router.delete('/delete/:username', async (req, res) => {
    try {
        const result = await User.deleteOne({ username: req.params.username });
        if (result.deletedCount === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ msg: 'User deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// DELETE HISTORY ITEM
router.delete('/history/:username/:historyId', async (req, res) => {
    try {
        const { username, historyId } = req.params;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Pull the item from array
        // Mongoose automatically casts string historyId to ObjectId for comparison if needed
        const initialLen = user.testHistory.length;
        user.testHistory = user.testHistory.filter(item => item._id.toString() !== historyId);

        if (user.testHistory.length === initialLen) {
            return res.status(404).json({ msg: 'History item not found' });
        }

        await user.save();
        res.json(user.testHistory); // Return updated list
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// EQUIP TITLE
router.post('/equip-title', async (req, res) => {
    try {
        const { username, titleId } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        user.equippedTitle = titleId;
        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// UNLOCK TITLE
router.post('/unlock-title', async (req, res) => {
    try {
        const { username, titleId } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (!user.unlockedTitles.includes(titleId)) {
            user.unlockedTitles.push(titleId);
            await user.save();
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// CLAIM ACHIEVEMENT
router.post('/claim-achievement', async (req, res) => {
    try {
        const { username, achievementId } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (!user.claimedAchievements.includes(achievementId)) {
            user.claimedAchievements.push(achievementId);

            // CHECK TITLE UNLOCKS (1 Title per 5 Claims)
            const claimedCount = user.claimedAchievements.length;
            const titlesToCheck = [
                { id: "title_01", req: 5 },
                { id: "title_02", req: 10 },
                { id: "title_03", req: 15 },
                { id: "title_04", req: 20 },
                { id: "title_05", req: 25 },
                { id: "title_06", req: 30 },
                { id: "title_07", req: 35 },
                { id: "title_08", req: 40 },
                { id: "title_09", req: 45 },
                { id: "title_10", req: 50 }
            ];

            titlesToCheck.forEach(t => {
                if (claimedCount >= t.req && !user.unlockedTitles.includes(t.id)) {
                    user.unlockedTitles.push(t.id);
                }
            });

            await user.save();
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// CLAIM ALL ACHIEVEMENTS
router.post('/claim-all-achievements', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Find achievements that are completed (in achievements array) but NOT in claimedAchievements
        const newlyClaimed = user.achievements.filter(id => !user.claimedAchievements.includes(id));

        if (newlyClaimed.length > 0) {
            user.claimedAchievements.push(...newlyClaimed);

            // CHECK TITLE UNLOCKS (Bulk check)
            const claimedCount = user.claimedAchievements.length;
            const titlesToCheck = [
                { id: "title_01", req: 5 },
                { id: "title_02", req: 10 },
                { id: "title_03", req: 15 },
                { id: "title_04", req: 20 },
                { id: "title_05", req: 25 },
                { id: "title_06", req: 30 },
                { id: "title_07", req: 35 },
                { id: "title_08", req: 40 },
                { id: "title_09", req: 45 },
                { id: "title_10", req: 50 }
            ];

            titlesToCheck.forEach(t => {
                if (claimedCount >= t.req && !user.unlockedTitles.includes(t.id)) {
                    user.unlockedTitles.push(t.id);
                }
            });

            await user.save();
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// SPEND COINS (Virtual Shop)
router.post('/spend-coins', async (req, res) => {
    try {
        const { username, amount, itemId, itemType } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        if (user.coins < amount) {
            return res.status(400).json({ msg: 'Insufficient coins' });
        }

        // Deduct coins
        user.coins -= amount;

        // Logic for item type (e.g., avatar, title)
        if (itemType === 'title' && !user.unlockedTitles.includes(itemId)) {
            user.unlockedTitles.push(itemId);
        }

        await user.save();
        res.json({ msg: 'Purchase successful', user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

const QuestItem = require('../models/QuestItem');
const AchievementItem = require('../models/AchievementItem');

router.get('/daily-quests/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const now = new Date();
        const lastReset = user.lastQuestResetDate;

        // Reset if it's a new day
        if (!lastReset || lastReset.getDate() !== now.getDate() || lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {

            // Calculate current day cycle (1, 2, or 3)
            const epochStart = new Date("2024-01-01").getTime();
            const currentDay = Math.floor((Date.now() - epochStart) / (1000 * 60 * 60 * 24));
            const activeSetId = (currentDay % 3) + 1; // 1, 2, or 3

            // Fetch quests matching the active set
            let questsForToday = await QuestItem.find({ setId: activeSetId });

            // Fallback just in case no quests exist yet
            if (questsForToday.length === 0) {
                questsForToday = await QuestItem.find({}).limit(3);
            }

            const newQuests = questsForToday.map(q => ({
                id: q._id.toString(),
                title: q.title,
                target: q.target,
                progress: 0,
                reward: q.reward,
                questType: q.questType,
                claimed: false
            }));

            // Only update if we successfully fetched quests
            if (newQuests.length > 0) {
                user.activeQuests = newQuests;
                user.lastQuestResetDate = now;
                await user.save();
            }
        }

        res.json({
            quests: user.activeQuests,
            streak: user.streak,
            freezes: user.streakFreezes,
            coins: user.coins
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/progress-quest', async (req, res) => {
    try {
        const { username, questType, amount = 1 } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        let updated = false;

        // Loop through active quests and increment progress if it matches type
        user.activeQuests.forEach(quest => {
            // Match exactly by questType, or legacy fallback if missing
            const matchesType = quest.questType === questType || (!quest.questType && quest.id.startsWith(questType));
            if (matchesType && quest.progress < quest.target) {
                quest.progress += amount;
                if (quest.progress > quest.target) quest.progress = quest.target;
                updated = true;
            }
        });

        if (updated) {
            await user.save();
        }

        res.json(user.activeQuests);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/claim-quest', async (req, res) => {
    try {
        const { username, questId } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const quest = user.activeQuests.find(q => q.id === questId);
        if (!quest) return res.status(404).json({ msg: 'Quest not found' });

        if (quest.progress >= quest.target && !quest.claimed) {
            quest.claimed = true;
            user.coins += quest.reward;
            await user.save();
            res.json({ success: true, reward: quest.reward, coins: user.coins, quests: user.activeQuests });
        } else {
            res.status(400).json({ msg: 'Quest not completed or already claimed' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/buy-freeze', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const freezeCost = 200; // 200 coins for a freeze

        if (user.coins >= freezeCost && user.streakFreezes < 3) { // Max 3 carried at a time
            user.coins -= freezeCost;
            user.streakFreezes += 1;
            await user.save();
            res.json({ success: true, user });
        } else {
            res.status(400).json({ success: false, msg: 'Not enough coins or max freezes reached' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET AVAILABLE TITLES (SHOP)
const TitleItem = require('../models/TitleItem');
router.get('/titles', async (req, res) => {
    try {
        const titles = await TitleItem.find({});
        res.json(titles);
    } catch (err) {
        console.error("Shop Titles Fetch Error:", err.message);
        res.status(500).send('Server Error');
    }
});

// GET ACHIEVEMENTS
router.get('/achievements', async (req, res) => {
    try {
        const achs = await AchievementItem.find({});
        res.json(achs);
    } catch (err) {
        console.error("Fetch Achievements Error:", err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
