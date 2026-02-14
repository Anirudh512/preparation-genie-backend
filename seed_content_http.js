const http = require('http');

// IMPORT DATA
const contentY1 = require('./data/content_y1');
const contentY2 = require('./data/content_y2'); // Includes Year 2 Subjects (DLD, DS, COA, Java, DBMS, OS)
const contentY3Y4 = require('./data/content_y3_y4'); // Includes Year 3 & 4 (CN, DAA, AI, ML...)

const { generateDetailedContent } = require('./data/expanded_content_generator');

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

async function generateData() {
    const data = [];
    const subjectsWithContent = new Set();
    const unitsMap = new Map(); // subject -> Set(units)

    // 1. Process Known Content
    for (const [key, content] of Object.entries(allContent)) {
        // Key: "Subject_Unit_X"
        const parts = key.split("_Unit_");
        if (parts.length < 2) continue;

        const subject = parts[0];
        const unit = parts[1];

        // console.log(`Processing: ${subject} - Unit ${unit}`);

        // EXPAND CONTENT
        const expandedContent = generateDetailedContent(subject, unit, content);

        data.push({
            subject,
            unit,
            content: expandedContent
        });

        subjectsWithContent.add(subject);
        if (!unitsMap.has(subject)) unitsMap.set(subject, new Set());
        unitsMap.get(subject).add(unit);
    }

    // 2. Fill Gaps with Smart Placeholders
    for (const [subject, unitNames] of Object.entries(subjectUnitsMap)) {
        for (let i = 0; i < unitNames.length; i++) {
            const unitNum = (i + 1).toString();
            const unitTitle = unitNames[i];

            // Check if exists
            const existingUnits = unitsMap.get(subject);
            if (existingUnits && existingUnits.has(unitNum)) {
                continue; // Already has content
            }

            // Create Smart Placeholder
            const placeholderBase = `# Unit ${unitNum}: ${unitTitle}\n\n## 📝 Overview\n(Specific content regarding ${unitTitle} is being prepared.)\n\n## 📌 Expected Topics\n- Key concepts of ${unitTitle}\n- Applications in ${subject}\n\n> **Note**: Please check back later or add your own notes.`;

            // Apply Content Expansion Wrapper to Placeholder too!
            const expandedPlaceholder = generateDetailedContent(subject, unitNum, placeholderBase);

            // console.log(`Adding Placeholder: ${subject} - Unit ${unitNum}`);
            data.push({
                subject,
                unit: unitNum,
                content: expandedPlaceholder
            });
        }
    }

    return data;
}

async function run() {
    console.log("Generating Data...");
    const data = await generateData();
    console.log(`Generated ${data.length} items. Sending to API...`);

    // Batch Process
    const BATCH_SIZE = 20;
    for (let i = 0; i < data.length; i += BATCH_SIZE) {
        const batch = data.slice(i, i + BATCH_SIZE);
        console.log(`📡 Sending Batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(data.length / BATCH_SIZE)} (${batch.length} items)...`);
        await postData(batch);
    }
}

function postData(data) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({ data });

        const options = {
            hostname: 'localhost',
            port: 5000,
            path: '/api/admin/content/seed',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = http.request(options, (res) => {
            let responseBody = '';
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                if (res.statusCode === 200) {
                    console.log('✅ Batch Successful!');
                    resolve();
                } else {
                    console.error(`❌ Batch Failed: ${res.statusCode}`);
                    console.error(responseBody);
                    resolve(); // Continue even if failed? Better to resolve so loop continues.
                }
            });
        });

        req.on('error', (e) => {
            console.error(`❌ Request Error: ${e.message}`);
            resolve();
        });

        // Write data to request body
        req.write(postData);
        req.end();
    });
}

run();
