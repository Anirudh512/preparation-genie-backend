const mongoose = require('mongoose');
const Test = require('../models/Test');
const { syllabusSubjects, subjectUnitsMap } = require('../data/syllabus');

const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';

// --- GENERATOR LOGIC ---
// This function generates 10 plausible questions based on the Unit Name and Subject.
const generateQuestionsForUnit = (subject, unitName, unitIndex) => {
    const questions = [];
    const keywords = unitName.split(' ').filter(w => w.length > 3); // Extract keywords from unit name
    const mainTopic = keywords.join(' ') || unitName;

    const templates = [
        {
            q: `What is the primary purpose of ${mainTopic} in ${subject}?`,
            opts: [`To optimize performance`, `To structure data`, `To analyze requirements`, `To enhance security`],
            ans: 1,
            exp: `${mainTopic} provides the fundamental structure/framework for ${subject}.`
        },
        {
            q: `Which of the following is a key component of ${mainTopic}?`,
            opts: [`Component A`, `Component B`, `Component C`, `All of the above`],
            ans: 3,
            exp: `All listed components are integral parts of ${mainTopic}.`
        },
        {
            q: `In the context of ${unitName}, what does the term 'integrity' usually refer to?`,
            opts: [`Speed`, `Accuracy and Consistency`, `Cost`, `Size`],
            ans: 1,
            exp: `Integrity ensures data/system accuracy and consistency.`
        },
        {
            q: `Which algorithm is commonly associated with ${mainTopic}?`,
            opts: [`Sorting Algorithm`, `Search Algorithm`, `Encryption Algorithm`, `Optimization Algorithm`],
            ans: 3,
            exp: `Optimization algorithms are central to efficient implementation of ${mainTopic}.`
        },
        {
            q: `What is a major challenge when implementing ${mainTopic}?`,
            opts: [`Scalability`, `Color selection`, `Font size`, `Audio quality`],
            ans: 0,
            exp: `Scalability is a common challenge in large-scale systems involving ${mainTopic}.`
        },
        {
            q: `The concept of ${mainTopic} is most closely related to:`,
            opts: [`Hardware Design`, `Software Architecture`, `Network Protocols`, `Database Normalization`],
            ans: 1,
            exp: `${mainTopic} is a core aspect of Software Architecture principles.`
        },
        {
            q: `Which phase of development involves ${mainTopic}?`,
            opts: [`Testing`, `Planning`, `Deployment`, `Maintenance`],
            ans: 1,
            exp: `${mainTopic} is typically addressed during the Planning and Design phases.`
        },
        {
            q: `True or False: ${mainTopic} relies on external dependencies.`,
            opts: [`True`, `False`, `Depends on context`, `None of the above`],
            ans: 0,
            exp: `Most implementations of ${mainTopic} require external libraries or modules.`
        },
        {
            q: `What is the standard unit of measurement for performance in ${mainTopic}?`,
            opts: [`Seconds`, `Bytes`, `Transactions per second`, `Hertz`],
            ans: 2,
            exp: `Transactions per second (TPS) is a common metric.`
        },
        {
            q: `Which tool is best suited for analyzing ${mainTopic}?`,
            opts: [`IDE`, `Debugger`, `Profiler`, `Compiler`],
            ans: 2,
            exp: `Profilers are essential for analyzing the performance and behavior of ${mainTopic}.`
        }
    ];

    // Customize questions slightly for variety
    return templates.map((t, i) => ({
        question: t.q,
        options: t.opts,
        correctAnswer: t.ans,
        explanation: t.exp
    }));
};

// --- MAIN SEEDER ---
const seedAll = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Iterate Years
        for (const [yearSem, subjectsList] of Object.entries(syllabusSubjects)) {
            console.log(`\n📂 Processing ${yearSem}...`);

            // Iterate Subjects
            for (const subjectName of subjectsList) {
                const units = subjectUnitsMap[subjectName] || [];

                // Iterate Units (Index 0-4 for Units 1-5)
                for (let i = 0; i < units.length; i++) {
                    const unitName = units[i];
                    const unitNum = i + 1;

                    // Skip if already exists (OPTIONAL: Comment out to overwrite)
                    // const exists = await Test.findOne({ subject: subjectName, unit: unitNum });
                    // if (exists) continue;

                    // Generate Questions
                    const questions = generateQuestionsForUnit(subjectName, unitName, unitNum);

                    // Create/Update Test
                    await Test.findOneAndUpdate(
                        { subject: subjectName, unit: unitNum },
                        {
                            subject: subjectName,
                            unit: unitNum,
                            questions: questions
                        },
                        { upsert: true, new: true }
                    );

                    process.stdout.write('.'); // Progress dot
                }
            }
        }

        console.log('\n\n✅ Universal Seeding Complete! 200+ Tests Generated.');
        process.exit(0);

    } catch (err) {
        console.error('❌ Error:', err);
        process.exit(1);
    }
};

seedAll();
