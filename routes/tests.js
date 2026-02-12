const express = require('express');
const router = express.Router();
const Test = require('../models/Test');
const User = require('../models/User');
const { syllabusSubjects, subjectUnitsMap } = require('../data/syllabus');

// GET ALL SUBJECTS FOR YEAR/SEM
router.get('/subjects/:branch/:year/:sem', (req, res) => {
    // Key format: B.Tech-I-I Sem
    const key = `${req.params.branch}-${req.params.year}-${req.params.sem}`;
    const subjects = syllabusSubjects[key] || [];
    res.json(subjects);
});

// GET UNITS FOR SUBJECT
router.get('/units/:subject', (req, res) => {
    const units = subjectUnitsMap[req.params.subject] || [];
    res.json(units);
});

// GET TEST QUESTIONS (Simulated for now if DB empty, or fetch from DB)
router.get('/questions/:subject/:unit', async (req, res) => {
    try {
        const { subject, unit } = req.params;

        // Try to find a test in DB
        let test = await Test.findOne({ subject, unit: parseInt(unit) });

        if (!test) {
            // If no test allows dynamic creation or return empty/sample
            // For now, return a generic sample test if DB is empty to show it works
            return res.json({
                subject,
                unit,
                questions: Array.from({ length: 10 }, (_, i) => ({
                    question: `Sample Question ${i + 1} for ${subject} (Unit ${unit})`,
                    options: [
                        `Option A for Q${i + 1}`,
                        `Option B for Q${i + 1}`,
                        `Option C for Q${i + 1}`,
                        `Option D for Q${i + 1}`
                    ],
                    correctAnswer: i % 4, // vary correct answers
                    explanation: `Detailed explanation for Question ${i + 1}. The correct answer is Option ${String.fromCharCode(65 + (i % 4))}.`
                }))
            });
        }
        res.json(test);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// SUBMIT TEST
router.post('/submit', async (req, res) => {
    try {
        const { username, subject, unit, score, totalQuestions, maxStreak } = req.body;
        const timeTaken = req.body.timeTaken || 9999; // Seconds

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Add to history
        const now = new Date();
        user.testHistory.push({
            subject,
            unit,
            score,
            totalQuestions,
            timeTaken,
            date: now
        });

        // Update stats
        user.testsCompleted += 1;
        user.progress = Math.min(100, user.progress + 1);

        // --- ACHIEVEMENT LOGIC ---
        const newAchievements = [];
        const addToAch = (id) => {
            if (!user.achievements.includes(id)) {
                user.achievements.push(id);
                newAchievements.push(id);
            }
        };

        // --- HELPER: Find Year of Subject ---
        const getSubjectYear = (subjName) => {
            for (const [key, subjects] of Object.entries(syllabusSubjects)) {
                if (subjects.includes(subjName)) {
                    if (key.includes('B.Tech-I-')) return 1;
                    if (key.includes('B.Tech-II-')) return 2;
                    if (key.includes('B.Tech-III-')) return 3;
                    if (key.includes('B.Tech-IV-')) return 4;
                }
            }
            return 1; // Default
        };
        const currentYear = getSubjectYear(subject);

        const scorePct = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

        // 1. BASIC & FIRSTS
        if (user.testsCompleted >= 1) {
            addToAch('ach_03'); // First Attempt (Awarded on finish if not present)
            addToAch('ach_04'); // First Finish
        }
        if (scorePct >= 50) addToAch('ach_05'); // On Target
        if (scorePct === 100) addToAch('ach_08'); // Perfect Score

        // 2. TIME BASED
        if (timeTaken < 300) addToAch('ach_09'); // Quick Thinker (< 5 min)
        if (totalQuestions > 0 && (timeTaken / totalQuestions) < 5) addToAch('ach_21'); // Speedster (< 5s per question avg)

        const hour = now.getHours();
        if (hour < 8) addToAch('ach_12'); // Early Bird
        if (hour >= 22) addToAch('ach_11'); // Night Owl

        // 3. SKILL & STREAK (Single Test)
        if (maxStreak >= 10) addToAch('ach_24'); // Sharpshooter
        if (maxStreak >= 20) addToAch('ach_32'); // Sniper
        if (score === totalQuestions) addToAch('ach_40'); // Wizard (0 wrong)

        // 4. SPECIFIC SCORES
        if (Math.round(scorePct) === 77) addToAch('ach_41'); // Lucky
        if (Math.round(scorePct) === 40) addToAch('ach_42'); // Survivor

        // 5. YEAR SPECIFIC
        if (currentYear === 4 && scorePct === 100) addToAch('ach_23'); // Big Brain

        // 6. CUMULATIVE & HISTORY ANALYSIS
        const history = user.testHistory;

        // Bronze (70%+ in 3 tests)
        if (history.filter(h => (h.score / h.totalQuestions) >= 0.7).length >= 3) addToAch('ach_10');
        // Silver (80%+ in 5 tests)
        if (history.filter(h => (h.score / h.totalQuestions) >= 0.8).length >= 5) addToAch('ach_13');
        // Gold (90%+ in 5 tests)
        if (history.filter(h => (h.score / h.totalQuestions) >= 0.9).length >= 5) addToAch('ach_16');
        // Champion (90%+ in 10 tests)
        if (history.filter(h => (h.score / h.totalQuestions) >= 0.9).length >= 10) addToAch('ach_26');
        // Diamond (100% in 5 tests)
        if (history.filter(h => (h.score / h.totalQuestions) === 1).length >= 5) addToAch('ach_31');

        // Counts
        if (user.testsCompleted >= 50) addToAch('ach_29'); // Machine
        if (user.testsCompleted >= 100) addToAch('ach_48'); // Centurion

        // Speed Collection
        if (history.filter(h => h.timeTaken < 180).length >= 10) addToAch('ach_36'); // Lightning

        // Unstoppable (5 tests in one day) - Check count for today
        const todayStr = now.toDateString();
        if (history.filter(h => new Date(h.date).toDateString() === todayStr).length >= 5) addToAch('ach_38');

        // Graduate (Tests from all 4 years)
        const yearsTaken = new Set();
        history.forEach(h => yearsTaken.add(getSubjectYear(h.subject)));
        if (yearsTaken.has(1) && yearsTaken.has(2) && yearsTaken.has(3) && yearsTaken.has(4)) addToAch('ach_30');

        // 7. SUBJECT COLLECTIONS
        // Chemist (All Chemistry Units)
        // Check if history contains units 1,2,3,4,5 for 'Engineering Chemistry'
        const chemUnits = new Set(history.filter(h => h.subject === "Engineering Chemistry").map(h => h.unit));
        if (chemUnits.size >= 5) addToAch('ach_18');

        // Architect (All CAEG)
        const caegUnits = new Set(history.filter(h => h.subject === "Computer Aided Engineering Graphics").map(h => h.unit));
        if (caegUnits.size >= 5) addToAch('ach_20');

        // Coder (Programming Units) - Simplification: 5 units of 'Programming for Problem Solving' OR just generally many coding tests
        // Let's rely on PPS units
        const ppsUnits = new Set(history.filter(h => h.subject === "Programming for Problem Solving").map(h => h.unit));
        if (ppsUnits.size >= 5) addToAch('ach_19');

        // 8. META (Completionist)
        // We do this LAST
        if (user.achievements.length >= 45) addToAch('ach_45'); // Completionist
        if (user.achievements.length >= 49) addToAch('ach_49'); // GOAT (All others)

        await user.save();
        res.json({ msg: 'Test submitted successfully', user, newAchievements });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
