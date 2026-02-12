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

module.exports = router;
