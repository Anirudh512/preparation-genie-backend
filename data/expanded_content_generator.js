const commonTopics = {
    "Matrices and Calculus": {
        tips: ["Always check consistency before solving linear systems.", "Eigenvalues sum equals Trace; product equals Determinant."],
        applications: ["Computer Graphics (Rotation/Scaling matrices)", "Cryptography (Hill Cipher)", "PageRank Algorithm (Google)", "Structural Analysis (Stiffness Matrix)"],
        formulas: ["Rank(A) = Number of non-zero rows in Echelon form", "Cayley-Hamilton: A satisfies |A - λI| = 0", "Jacobian J = ∂(u,v)/∂(x,y)"]
    },
    "Engineering Chemistry": {
        tips: ["Memorize the Nernst Equation derivation.", "Understand the difference between temporary and permanent hardness."],
        applications: ["Water Treatment Plants (Reverse Osmosis)", "Battery Technology (EVs using Li-ion)", "Corrosion Prevention in Bridges", "Polymer Industry (Plastics, Fibers)"],
        formulas: ["Gibbs Free Energy: G = H - TS", "Nernst Eq: E = E0 - (RT/nF)lnQ", "Hardness (EDTA) = (V2 * M * 1000) / V1"]
    },
    "Programming for Problem Solving": {
        tips: ["Practice logic building with flowcharts.", "Understand memory allocation for pointers visually."],
        applications: ["Operating Systems (Linux is written in C)", "Embedded Systems (Arduino, IoT)", "Game Engines (Unreal Engine uses C++)", "High-Performance Computing"],
        formulas: ["size_of(int) is usually 4 bytes", "Pointer size depends on architecture (4 or 8 bytes)", "Time Complexity of Binary Search: O(log n)"]
    },
    // Year 2 Subjects
    "Data Structures (DS)": {
        tips: ["Visualize Linked List pointers before coding.", "Master Recursion for Tree traversals."],
        applications: ["Database Indexing (B-Trees)", "Social Networks (Graph Algorithms)", "Routing (Dijkstra's Algorithm)", "Browser History (Stacks)"],
        formulas: ["Array Access: O(1)", "LinkedList Access: O(n)", "BST Search: O(log n)", "QuickSort: O(n log n)"]
    },
    "Object Oriented Programming Through Java": {
        tips: ["Java is strictly Pass-by-Value (even for references).", "Understand the difference between Abstract Class and Interface."],
        applications: ["Android App Development", "Enterprise Web Apps (Spring Boot)", "Big Data (Hadoop)", "Banking Systems"],
        formulas: ["Polymorphism = One name, many forms", "Inheritance = IS-A relationship", "Composition = HAS-A relationship"]
    },
    "Database Management Systems (DBMS)": {
        tips: ["Normalization reduces redundancy but increases join complexity.", "ACID properties are non-negotiable for financial transactions."],
        applications: ["Banking Systems", "E-commerce Inventories", "User Management Systems", "Blockchain (Distributed Ledger)"],
        formulas: ["3NF: Key -> Whole Key -> Non-key", "BCNF: Every determinant is a candidate key", "Transaction Isolation Levels"]
    },
    "Digital Logic Design (DLD)": {
        tips: ["K-Maps wrap around edges!", "NAND and NOR are Universal Gates."],
        applications: ["CPU Architecture", "Memory Chips (RAM/ROM)", "Traffic Light Controllers", "Digital Watches"],
        formulas: ["DeMorgan: (AB)' = A' + B'", "Number of Minterms = 2^n"]
    },
    "Operating Systems (OS)": {
        tips: ["Distinguish between Process and Thread.", "Semaphores prevent race conditions."],
        applications: ["Windows/Linux/macOS", "Real-time Systems (Cars, Planes)", "Mobile OS (Android/iOS)", "Cloud Virtualization"],
        formulas: ["Turnaround Time = Completion - Arrival", "Waiting Time = Turnaround - Burst"]
    },
    "Computer Organization and Architecture (COA)": {
        tips: ["Understand the Instruction Cycle: Fetch -> Decode -> Execute.", "Pipeline hazards reduce throughput."],
        applications: ["Processor Design (Intel/AMD)", "Compiler Optimization", "Embedded Controllers"],
        formulas: ["Speedup = Time(non-pipelined) / Time(pipelined)", "CPI = Cycles Per Instruction"]
    }
};

const genericFiller = {
    tips: ["Review the lecture notes daily.", "Practice previous year questions.", "Focus on understanding concepts rather than rote memorization."],
    applications: ["Research and Development", "Industrial Automation", "Software Engineering", "Data Analysis"],
    formulas: ["Check standard textbook for derivations.", "Verify units in numerical problems."]
};

function generateDetailedContent(subject, unit, shortContent) {
    const topicData = commonTopics[subject] || genericFiller;

    // Create a rich, expanded structure
    let expanded = shortContent;

    // 1. Add Study Guide / Tips
    expanded += `\n\n## 💡 Study & Exam Tips\n`;
    expanded += `To master **${subject} - Unit ${unit}**, focus on the following:\n`;
    topicData.tips.forEach(tip => expanded += `- ${tip}\n`);
    expanded += `- **Visualization**: Try to draw diagrams for every concept in this unit.\n`;
    expanded += `- **Practice**: Solve at least 5 numericals/coding problems related to this unit.\n`;

    // 2. Add Real World Applications (Deep Dive)
    expanded += `\n## 🌍 Real-world Applications\n`;
    expanded += `Why do we study this? Here are practical uses:\n`;
    topicData.applications.forEach((app, index) => {
        expanded += `### ${index + 1}. ${app.split('(')[0].trim()}\n`;
        expanded += `This concept is heavily used in ${app}. Engineers use it to optimize performance and ensure safety in real-world systems.\n\n`;
    });

    // 3. Add Important Questions / Interview Prep
    expanded += `\n## ❓ Common Interview & Exam Questions\n`;
    expanded += `1. **Define the core concept of Unit ${unit}?**\n   *Answer*: Start with the definition, then explain the physical/logical significance.\n`;
    expanded += `2. **Differentiate between the key terms in this unit.**\n   *Hint*: Use a table for comparison (e.g., Structure vs Union, Process vs Thread).\n`;
    expanded += `3. **Explain the derivation/algorithm detailed in Section 2.**\n   *Focus*: Step-by-step logical flow.\n`;

    // 4. Add "Deep Dive" Section (Generic but detailed structure)
    expanded += `\n## 📖 Deep Dive: Advanced Insights\n`;
    expanded += `> **Critical Thinking**: How does this unit connect to the next one?\n\n`;
    expanded += `In this unit, we established the foundational implementation. In the next unit, we will often see how to *optimize* or *scale* these concepts. For example, understanding basic **Arrays** (Unit 3) is a prerequisite for **Pointers** (Unit 4) in C programming.\n\n`;
    if (topicData.formulas.length > 0) {
        expanded += `### ⚡ Key Formula Cheat Sheet\n`;
        topicData.formulas.forEach(f => expanded += `- $${f}$\n`);
    }

    // 5. Summary
    expanded += `\n## 🏁 Summary\n`;
    expanded += `We have covered the definitions, properties, and applications of **Unit ${unit}**. Ensure you are comfortable with the solved examples provided in class. Continuous revision of the **Key Concepts** section above is recommended.\n`;

    return expanded;
}

module.exports = { generateDetailedContent };
