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
// 6. GET STUDY CONTENT (For Editing)
router.get('/content/:subject/:unit', async (req, res) => {
    try {
        let { subject, unit } = req.params;
        // Decode URI components to handle spaces and special chars
        subject = decodeURIComponent(subject);
        unit = decodeURIComponent(unit);

        console.log(`Fetching Content for Subject: "${subject}", Unit: "${unit}"`);

        const content = await StudyContent.findOne({ subject, unit });
        if (!content) {
            console.log("Content not found.");
            return res.json({ content: "" }); // Return empty string if not found
        }
        res.json(content);
    } catch (err) {
        console.error("Error fetching content:", err);
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

// 9. UPDATE QUESTIONS LIST (Replace all questions for a unit)
router.post('/questions/update', async (req, res) => {
    try {
        const { subject, unit, questions } = req.body; // questions is Array of objects

        if (!subject || !unit || !Array.isArray(questions)) {
            return res.status(400).json({ msg: 'Invalid data' });
        }

        let test = await Test.findOne({ subject, unit });

        if (!test) {
            test = new Test({ subject, unit, questions: [] });
        }

        test.questions = questions; // Replace entirely
        await test.save();

        res.json({ msg: 'Questions Updated Successfully', data: test.questions });

    } catch (err) {
        console.error("Update Questions Error:", err);
        res.status(500).send('Server Error');
    }
});

// 9. SYLLABUS MANAGEMENT
const Syllabus = require('../models/Syllabus');

// GET Full Syllabus
router.get('/syllabus', async (req, res) => {
    try {
        const syllabus = await Syllabus.find({});
        res.json(syllabus);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// ADD Subject to Year/Sem
router.post('/syllabus/subject', async (req, res) => {
    try {
        const { yearSem, subject } = req.body;
        if (!yearSem || !subject) return res.status(400).json({ msg: 'Missing fields' });

        let entry = await Syllabus.findOne({ yearSem });
        if (!entry) {
            // Create new Year/Sem entry if not exists
            entry = new Syllabus({ yearSem, subjects: [] });
        }

        // Check if subject already exists
        if (entry.subjects.some(s => s.name === subject)) {
            return res.status(400).json({ msg: 'Subject already exists' });
        }

        entry.subjects.push({ name: subject, units: ["1", "2", "3", "4", "5"] }); // Default units
        await entry.save();
        res.json({ msg: 'Subject Added', data: entry });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// ADD Unit to Subject
// ADD Unit to Subject
router.post('/syllabus/unit', async (req, res) => {
    try {
        const { yearSem, subject, unit } = req.body;
        if (!yearSem || !subject || !unit) return res.status(400).json({ msg: 'Missing fields' });

        const entry = await Syllabus.findOne({ yearSem });
        if (!entry) return res.status(404).json({ msg: 'Year/Sem not found' });

        const subjectEntry = entry.subjects.find(s => s.name === subject);
        if (!subjectEntry) return res.status(404).json({ msg: 'Subject not found' });

        if (subjectEntry.units.includes(unit)) {
            return res.status(400).json({ msg: 'Unit already exists' });
        }

        subjectEntry.units.push(unit);
        await entry.save();
        res.json({ msg: 'Unit Added', data: entry });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// SEED Syllabus (One-time use)
router.post('/syllabus/seed', async (req, res) => {
    try {
        const { data } = req.body; // Expects array of { yearSem, subjects: [...] }
        if (!data) return res.status(400).json({ msg: 'No data provided' });

        await Syllabus.deleteMany({}); // Clear existing
        // Transform data map to array
        // Expected structure from frontend: { "Year-Sem": ["Sub1", "Sub2"] }

        for (const [key, value] of Object.entries(data)) {
            const subjectsObj = value.map(subName => ({
                name: subName,
                units: ["1", "2", "3", "4", "5"]
            }));

            await new Syllabus({
                yearSem: key,
                subjects: subjectsObj
            }).save();
        }

        res.json({ msg: 'Syllabus Seeded Successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// SEED Study Content (One-time use)
router.post('/content/seed', async (req, res) => {
    try {
        const { data } = req.body; // Expects array of { subject, unit, content }
        if (!data) return res.status(400).json({ msg: 'No data provided' });

        await StudyContent.deleteMany({}); // Clear existing

        // Insert all
        await StudyContent.insertMany(data);

        res.json({ msg: 'Content Seeded Successfully' });
    } catch (err) {
        console.error("Content Seed Error:", err);
        res.status(500).send('Server Error: ' + err.message);
    }
});

// SEED Questions (One-time use)
router.post('/question/seed', async (req, res) => {
    try {
        const { data } = req.body; // Expects array of { subject, unit (number), questions }
        if (!data) return res.status(400).json({ msg: 'No data provided' });

        await Test.deleteMany({}); // Clear existing

        // Insert all
        await Test.insertMany(data);

        res.json({ msg: 'Questions Seeded Successfully' });
    } catch (err) {
        console.error("Question Seed Error:", err);
        res.status(500).send('Server Error: ' + err.message);
    }
});

// 12. PREVIOUS YEAR QUESTIONS (PYQs) - Dynamic Management
const PreviousYearQuestion = require('../models/PreviousYearQuestion');

// GET PYQs for Subject/Unit
router.get('/pyq/:subject/:unit', async (req, res) => {
    try {
        let { subject, unit } = req.params;
        subject = decodeURIComponent(subject);
        unit = decodeURIComponent(unit);

        const questions = await PreviousYearQuestion.find({ subject, unit }).sort({ priority: 1, year: -1 });
        res.json(questions);
    } catch (err) {
        console.error("Fetch PYQ Error:", err);
        res.status(500).send('Server Error');
    }
});

// ADD PYQ
router.post('/pyq', async (req, res) => {
    try {
        const { subject, unit, question, year, priority } = req.body;
        if (!subject || !unit || !question || !year) return res.status(400).json({ msg: 'Missing fields' });

        const newQ = new PreviousYearQuestion({
            subject,
            unit,
            question,
            year,
            priority: priority || 'normal'
        });
        await newQ.save();
        res.json({ msg: 'PYQ Added', data: newQ });
    } catch (err) {
        console.error("Add PYQ Error:", err);
        res.status(500).send('Server Error');
    }
});

// DELETE PYQ
router.delete('/pyq/:id', async (req, res) => {
    try {
        await PreviousYearQuestion.findByIdAndDelete(req.params.id);
        res.json({ msg: 'PYQ Deleted' });
    } catch (err) {
        console.error("Delete PYQ Error:", err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
