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

// COPIED FROM syllabus_data.dart
const subjectUnitsMap = {
    "Matrices and Calculus": [
        "Theory of Matrices",
        "System of Linear Equations",
        "Vector Calculus",
        "Differential Calculus",
        "Integral Calculus"
    ],
    "Engineering Chemistry": [
        "Atomic Structure and Chemical Bonding",
        "Chemical Thermodynamics and Thermochemistry",
        "Electrochemistry and Corrosion",
        "Water Technology",
        "Polymers and Materials Chemistry"
    ],
    "Programming for Problem Solving": [
        "Basics of Programming",
        "Control Structures and Functions",
        "Arrays and Strings",
        "Pointers and Structures",
        "File Handling and Recursion"
    ],
    "Computer Aided Engineering Graphics": [
        "Basics of Engineering Graphics",
        "Orthographic Projections",
        "Sectional Views",
        "Isometric Projections",
        "Computer-Aided Drafting Concepts"
    ],
    "Basic Electronic Engineering": [
        "Semiconductor Devices and Diodes",
        "Bipolar Junction Transistor (BJT)",
        "Field Effect Transistor (FET)",
        "Amplifiers and Oscillators",
        "Digital Electronics Basics"
    ],
    "Ordinary Differential Equations and Vector Calculus": [
        "Advanced Integration",
        "Partial Differentiation",
        "Multiple Integrals",
        "Fourier Series",
        "Differential Equations"
    ],
    "Applied Physics": [
        "Oscillations and Waves",
        "Electromagnetic Theory",
        "Quantum Mechanics",
        "Solid State Physics",
        "Nuclear Physics"
    ],
    "Electronic Devices and Circuits (EDC)": [
        "Semiconductor Physics",
        "Diode Circuits",
        "BJT Amplifiers",
        "Field Effect Transistors",
        "Operational Amplifiers"
    ],
    "English for Skill Enhancement": [
        "Grammar and Vocabulary",
        "Reading Comprehension",
        "Writing Skills",
        "Listening Skills",
        "Speaking Skills"
    ],
    "Probability and Statistics": [
        "Probability Basics",
        "Random Variables",
        "Probability Distributions",
        "Sampling Theory",
        "Statistical Inference"
    ],
    "Digital Logic Design (DLD)": [
        "Number Systems",
        "Boolean Algebra",
        "Combinational Circuits",
        "Sequential Circuits",
        "Logic Families"
    ],
    "Data Structures (DS)": [
        "Arrays and Linked Lists",
        "Stacks and Queues",
        "Trees",
        "Graphs",
        "Hashing"
    ],
    "Computer Oriented Statistical Methods (COSM)": [
        "Descriptive Statistics",
        "Correlation & Regression",
        "Random Variables & Distributions",
        "Estimation Theory",
        "Hypothesis Testing"
    ],
    "Computer Organization and Architecture (COA)": [
        "Computer Arithmetic",
        "Processor Organization",
        "Memory Organization",
        "I/O Organization",
        "Assembly Language Programming"
    ],
    "Object Oriented Programming Through Java": [
        "OOP Concepts",
        "Java Basics",
        "Inheritance & Polymorphism",
        "Exception Handling",
        "File IO & Streams"
    ],
    "Discrete Mathematics (DM)": [
        "Set Theory",
        "Relations & Functions",
        "Graph Theory",
        "Combinatorics",
        "Groups & Rings"
    ],
    "Business Economics and Financial Analysis (BEFA)": [
        "Microeconomics",
        "Macroeconomics",
        "Financial Statements",
        "Costing and Pricing",
        "Capital Budgeting"
    ],
    "Database Management Systems (DBMS)": [
        "Introduction to DBMS",
        "Relational Model",
        "SQL & Query Processing",
        "Transaction Management",
        "Database Security"
    ],
    "Operating Systems (OS)": [
        "Process Management",
        "Memory Management",
        "File Systems",
        "CPU Scheduling",
        "Distributed Systems"
    ],
    "Software Engineering (SE)": [
        "Software Process Models",
        "Requirements Engineering",
        "Design Concepts",
        "Testing Strategies",
        "Project Management"
    ],
    "Computer Networks": [
        "Introduction to Networks",
        "OSI & TCP/IP Models",
        "Switching & Routing",
        "Network Protocols",
        "Network Security"
    ],
    "Information Retrieval System": [
        "Introduction to IR Systems",
        "Text Processing",
        "Indexing and Searching",
        "Retrieval Models",
        "Evaluation of IR"
    ],
    "Design And Analysis Of Algorithms": [
        "Algorithm Complexity",
        "Divide and Conquer",
        "Greedy Algorithms",
        "Dynamic Programming",
        "Graph Algorithms"
    ],
    "Principles of Programming Languages": [
        "Syntax and Semantics",
        "Data Types",
        "Control Structures",
        "Subprograms",
        "Memory Management"
    ],
    "DevOps": [
        "Introduction to DevOps",
        "Continuous Integration",
        "Configuration Management",
        "Infrastructure as Code",
        "Monitoring"
    ],
    "Machine Learning": [
        "Introduction to Machine Learning",
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Neural Networks"
    ],
    "Fundamental Of Artificial Intelligence": [
        "Introduction to Internet Things",
        "M2M and Arduino Programming",
        "Python Programming and Raspberry pi",
        "SDN and Data Handling in loT",
        "Cloud Computing and loT Applications",
    ],
    "Artificial Intelligence": [
        "Introducing to Artificial Intelligence",
        "Search Strategies",
        "Knowledge Representation and Reasoning",
        "Machine Learning and Reasoning",
        "Applications and Advanced topics"
    ],
    "Formal Languages and Automata Theory": [
        "Finite Automata/Introduction to Formal Languages",
        "Regular Expressions and Languages",
        "Context-Free Grammers and Languages",
        "Pushdown Automata",
        "Turing Machines and Undecidability"
    ],
    "Mobile Application Development": [
        "Android Setup",
        "UI Design",
        "Activities & Intents",
        "Data Storage",
        "APIs and Networking"
    ],
    "Predictive Analytics": [
        "Data Exploration",
        "Model Building",
        "Model Testing",
        "Regression",
        "Classification"
    ],
    "Scripting Languages": [
        "Introduction to Scripting",
        "Python Basics",
        "Shell Scripting",
        "Regular Expressions",
        "File Handling"
    ],
    "Video Analytics": [
        "Video Processing Basics",
        "Motion Detection & Tracking",
        "Object Recognition",
        "Event Detection",
        "Applications"
    ],
    "Introduction to Social Media Mining": [
        "Social Media Overview",
        "Graph Mining Techniques",
        "Community Detection",
        "Sentiment Analysis",
        "Applications"
    ],
    "Data Visualization Using Python": [
        "Python Visualization Basics",
        "Matplotlib & Seaborn",
        "Interactive Visualization",
        "Dash Dashboards",
        "Advanced Techniques"
    ],
};

async function seedPlaceholders() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected.");

        let createdCount = 0;
        let existsCount = 0;

        for (const [subject, units] of Object.entries(subjectUnitsMap)) {
            // units is an Array of Strings: ["Unit Name 1", "Unit Name 2"...]
            // We need to loop 1 to 5.

            // Wait, the map values are Unit Names, but keys in DB are "1", "2"...

            for (let i = 0; i < units.length; i++) {
                const unitNum = (i + 1).toString();
                const unitName = units[i];

                // Check if exists
                const exists = await StudyContent.findOne({ subject, unit: unitNum });

                if (!exists) {
                    console.log(`Creating Placeholder: ${subject} - Unit ${unitNum}`);

                    const placeholder = `# Unit ${unitNum}: ${unitName}\n\n## Introduction\n(Content coming soon...)`;

                    await StudyContent.create({
                        subject,
                        unit: unitNum,
                        content: placeholder,
                        lastUpdated: new Date()
                    });
                    createdCount++;
                } else {
                    existsCount++;
                }
            }
        }

        console.log(`Done! Created ${createdCount} placeholders. Skipped ${existsCount} existing.`);

    } catch (e) {
        console.error("Seeding Error:", e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

seedPlaceholders();
