const express = require('express');
const router = express.Router();
const User = require('../models/User');
const StudyContent = require('../models/StudyContent');

// --- ADMIN CREDENTIALS (Hardcoded as requested) ---
const ADMIN_USERNAME = 'ADMIN_1';
const ADMIN_PIN = '7569527481';
const RECOVERY_QUESTION = 'what is your fav food';
const RECOVERY_ANSWER = 'mango';

// 1. ADMIN LOGIN
router.post('/login', (req, res) => {
    const { username, pin } = req.body;
    if (username === ADMIN_USERNAME && pin === ADMIN_PIN) {
        // In a real app, send a JWT token. For now, simple success.
        return res.json({ msg: 'Admin Login Successful', role: 'admin' });
    }
    return res.status(401).json({ msg: 'Invalid Admin Credentials' });
});

// 2. ADMIN RECOVERY (Forgot PIN)
router.post('/recover', (req, res) => {
    const { answer } = req.body;
    if (answer && answer.toLowerCase().trim() === RECOVERY_ANSWER) {
        return res.json({
            msg: 'Recovery Successful',
            credentials: { username: ADMIN_USERNAME, pin: ADMIN_PIN }
        });
    }
    return res.status(401).json({ msg: 'Incorrect Answer' });
});

// 3. GET ALL USERS
router.get('/users', async (req, res) => {
    try {
        // Exclude sensitive details if any
        const users = await User.find({}, '-pin -securityAnswer').sort({ _id: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// 4. DELETE USER
router.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ msg: 'User Deleted Successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// 5. RESET USER PIN (Admin Power)
router.post('/users/reset-pin', async (req, res) => {
    try {
        const { userId, newPin } = req.body;
        await User.findByIdAndUpdate(userId, { pin: newPin });
        res.json({ msg: 'User PIN Reset Successfully' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// 6. GET STUDY CONTENT (For Editing)
router.get('/content/:subject/:unit', async (req, res) => {
    try {
        const { subject, unit } = req.params;
        const content = await StudyContent.findOne({ subject, unit });
        if (!content) return res.json({ content: "" }); // Return empty string if not found
        res.json(content);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// 7. SAVE STUDY CONTENT
router.post('/content', async (req, res) => {
    try {
        const { subject, unit, content } = req.body;

        // Upsert: Update if exists, Insert if new
        const result = await StudyContent.findOneAndUpdate(
            { subject, unit },
            { content, lastUpdated: Date.now() },
            { new: true, upsert: true } // options
        );

        res.json({ msg: 'Content Saved Successfully', data: result });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// 8. ADD QUESTION (Question Bank)
const Test = require('../models/Test');

router.post('/question', async (req, res) => {
    try {
        const { subject, unit, question, options, correctAnswer, explanation } = req.body;

        // Validation
        if (!subject || !unit || !question || !options || correctAnswer === undefined || !explanation) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        // Find the Test document for this Subject + Unit
        let test = await Test.findOne({ subject, unit });

        if (!test) {
            // Create new Test document if it doesn't exist
            test = new Test({
                subject,
                unit,
                questions: []
            });
        }

        // Add the new question
        const newQuestion = {
            question,
            options,
            correctAnswer,
            explanation
        };

        test.questions.push(newQuestion);
        await test.save();

        res.json({ msg: 'Question Added Successfully', data: newQuestion });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
