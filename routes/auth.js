const express = require('express');
const router = express.Router();
const User = require('../models/User');

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { username, email, pin, name, rollNo, branch, section, securityQuestion, securityAnswer } = req.body;

        // Check if user exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'Username already exists' });
        }

        // Create new user
        user = new User({
            username,
            email,
            pin, // In production, hash this!
            name,
            rollNo,
            branch,
            section,
            securityQuestion,
            securityQuestion,
            securityAnswer: securityAnswer.toLowerCase(),
            // GAMIFICATION: Award "Newbie" immediately
            achievements: ['ach_01']
        });

        await user.save();
        res.status(201).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, pin } = req.body;

        // Check user
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Check PIN
        if (pin !== user.pin) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // --- STREAK LOGIC ---
        const now = new Date();
        const lastLogin = user.lastLoginDate ? new Date(user.lastLoginDate) : null;

        if (lastLogin) {
            const diffTime = Math.abs(now - lastLogin);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Check if same day (ignore)
            const isSameDay = now.toDateString() === lastLogin.toDateString();

            if (!isSameDay) {
                if (diffDays === 1) {
                    // Consecutive day
                    user.loginStreak += 1;
                } else {
                    // Missed a day
                    user.loginStreak = 1;
                }
            }
        } else {
            // First time logic
            user.loginStreak = 1;
        }
        user.lastLoginDate = now;

        // --- ACHIEVEMENT LOGIC ---
        const newAchievements = [];
        const addToAch = (id) => {
            if (!user.achievements.includes(id)) {
                user.achievements.push(id);
                newAchievements.push(id);
            }
        };

        // Newbie
        if (!user.achievements.includes('ach_01')) addToAch('ach_01');

        // Streaks
        if (user.loginStreak >= 2) addToAch('ach_06'); // Streak Starter
        if (user.loginStreak >= 7) addToAch('ach_17'); // Weekly Warrior
        if (user.loginStreak >= 14) addToAch('ach_27'); // On Fire
        if (user.loginStreak >= 30) addToAch('ach_35'); // Open Door
        if (user.loginStreak >= 50) addToAch('ach_46'); // Devoted

        await user.save();

        res.json({
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                achievements: user.achievements,
                claimedAchievements: user.claimedAchievements,
                loginStreak: user.loginStreak
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// FORGOT PIN - VERIFY ANSWER & RESET
router.post('/forgot-pin', async (req, res) => {
    try {
        const { username, securityAnswer, newPin } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const storedAnswer = user.securityAnswer ? user.securityAnswer.trim().toLowerCase() : "";
        const providedAnswer = securityAnswer ? securityAnswer.trim().toLowerCase() : "";

        console.log(`Reset PIN Check for ${username}:`);
        console.log(`Stored: "${storedAnswer}" | Provided: "${providedAnswer}"`);

        if (storedAnswer !== providedAnswer) {
            return res.status(400).json({ msg: 'Incorrect Security Answer' });
        }

        user.pin = newPin;
        await user.save();

        res.json({ msg: 'PIN updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// VERIFY SECURITY ANSWER (Step 2)
router.post('/verify-security-answer', async (req, res) => {
    try {
        const { username, securityAnswer } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const storedAnswer = user.securityAnswer ? user.securityAnswer.trim().toLowerCase() : "";
        const providedAnswer = securityAnswer ? securityAnswer.trim().toLowerCase() : "";

        console.log(`Verifying Answer for ${username}:`);
        console.log(`Stored: "${storedAnswer}" | Provided: "${providedAnswer}"`);

        if (storedAnswer === providedAnswer) {
            return res.json({ msg: 'Answer verified' });
        } else {
            return res.status(400).json({ msg: 'Incorrect Security Answer' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// GET SECURITY QUESTION
router.get('/security-question/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json({ question: user.securityQuestion });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
