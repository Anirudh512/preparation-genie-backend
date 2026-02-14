const mongoose = require('mongoose');
// Hardcoded URI as .env might fail in standalone
const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';

const studyContentSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    unit: { type: String, required: true },
    content: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

const StudyContent = mongoose.model('StudyContent', studyContentSchema);

// IMPORT DATA
const contentY1 = require('./data/content_y1');
const contentY2 = require('./data/content_y2'); // Includes Year 2 Subjects (DLD, DS, COA, Java, DBMS, OS)
const contentY3Y4 = require('./data/content_y3_y4'); // Includes Year 3 & 4 (CN, DAA, AI, ML...)

// MERGE ALL CONTENT
const allContent = {
    ...contentY1,
    ...contentY2,
    ...contentY3Y4
};

// SYLLABUS MAP (For checking gaps)
const subjectUnitsMap = {
    "Matrices and Calculus": ["Theory of Matrices", "Eigenvalues and Eigenvectors", "Calculus", "Multiple Integrals", "Vector Calculus"],
    "Engineering Chemistry": ["Atomic Structure and Chemical Bonding", "Chemical Thermodynamics and Thermochemistry", "Electrochemistry and Corrosion", "Water Technology", "Polymers and Materials Chemistry"],
    "Programming for Problem Solving": ["Basics of Programming", "Control Structures and Functions", "Arrays and Strings", "Pointers and Structures", "File Handling and Recursion"],
    "Basic Electronic Engineering": ["Semiconductor Devices and Diodes", "Bipolar Junction Transistor (BJT)", "Field Effect Transistor (FET)", "Amplifiers and Oscillators", "Digital Electronics Basics"],
    "Applied Physics": ["Oscillations and Waves", "Electromagnetic Theory", "Quantum Mechanics", "Solid State Physics", "Nuclear Physics"],
    "Digital Logic Design (DLD)": ["Boolean Algebra", "Combinational Circuits", "Sequential Circuits", "Finite State Machines", "Logic Families"],
    "Data Structures (DS)": ["Introduction", "Stacks and Queues", "Trees", "Graphs", "Searching & Hashing"],
    "Computer Organization and Architecture (COA)": ["Basic Structure", "Instruction Set", "Processor Organization", "Memory Organization", "I/O Organization"],
    "Object Oriented Programming Through Java": ["OOP Concepts", "Inheritance", "Exception Handling", "Files & Collections", "GUI/AWT"],
    "Database Management Systems (DBMS)": ["Intro to DBMS", "Relational Model", "SQL", "Transactions", "Storage & Indexing"],
    "Operating Systems (OS)": ["Intro", "Process Management", "Synchronization", "Memory Management", "File Systems"],
    "Software Engineering (SE)": ["Process Models", "Requirements", "Design", "Testing", "Quality"],
    "Computer Networks": ["Intro", "Data Link", "Network", "Transport", "Application"],
    "Design And Analysis Of Algorithms": ["Basics", "Divide & Conquer", "Greedy", "Dynamic Programming", "Backtracking"],
    "Artificial Intelligence": ["Intro", "Search", "Knowledge Rep", "Probability", "Learning"],
    "Machine Learning": ["Intro", "Trees & ANN", "Bayesian", "Instance Based", "Genetic & RL"],
    "Predictive Analytics": ["Intro", "Linear Regression", "Logistic Regression", "Time Series", "Trees"],
    // Add other subjects if needed, the script handles missing map entires gracefully
};

async function seedComprehensive() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected.");

        let updatedCount = 0;
        let createdCount = 0;

        // 1. Seed Known Content
        for (const [key, content] of Object.entries(allContent)) {
            // Key: "Subject_Unit_X"
            const parts = key.split("_Unit_");
            if (parts.length < 2) continue;

            const subject = parts[0];
            const unit = parts[1];

            console.log(`Upserting: ${subject} - Unit ${unit}`);
            await StudyContent.findOneAndUpdate(
                { subject, unit },
                { content, lastUpdated: new Date() },
                { upsert: true, new: true }
            );
            updatedCount++;
        }

        // 2. Fill Gaps with Smart Placeholders
        for (const [subject, unitNames] of Object.entries(subjectUnitsMap)) {
            for (let i = 0; i < unitNames.length; i++) {
                const unitNum = (i + 1).toString();
                const unitTitle = unitNames[i];

                // Check if exists (either from step 1 or previously)
                // Actually, we want to OVERWRITE "Coming Soon" placeholders if we have better generic info,
                // But for now, let's just create if missing.

                const exists = await StudyContent.findOne({ subject, unit: unitNum });

                // If exists, checks if it's a "Coming Soon" placeholder? 
                // We'll trust step 1 overwrote everything we had data for.
                // If step 1 didn't have data, and DB has "Coming Soon", we might want to upgrade it?
                // For simplicity, let's just log.

                if (!exists) {
                    // Create Smart Placeholder
                    const placeholder = `# Unit ${unitNum}: ${unitTitle}\n\n## 📝 Overview\n(Specific content regarding ${unitTitle} is being prepared.)\n\n## 📌 Expected Topics\n- Key concepts of ${unitTitle}\n- Applications in ${subject}\n\n> **Note**: Please check back later or add your own notes.`;

                    console.log(`Creating Smart Placeholder: ${subject} - Unit ${unitNum}`);
                    await StudyContent.create({
                        subject,
                        unit: unitNum,
                        content: placeholder,
                        lastUpdated: new Date()
                    });
                    createdCount++;
                }
            }
        }

        console.log(`\n--- SUMMARY ---`);
        console.log(`Updated/Seeded Detailed Content: ${updatedCount} units`);
        console.log(`Created Smart Placeholders: ${createdCount} units`);
        console.log(`Total Operations Successful.`);

    } catch (e) {
        console.error("Seeding Error:", e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

seedComprehensive();
