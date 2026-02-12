const year2Sem2Questions = [
    // ==========================================
    // DISCRETE MATHEMATICS (DM)
    // ==========================================
    {
        subject: "Discrete Mathematics (DM)",
        unit: 1,
        questions: [
            { question: "Contrapositive of p -> q is:", options: ["~q -> ~p", "q -> p", "~p -> ~q", "p -> ~q"], correctAnswer: 0, explanation: "Logically equivalent." },
            { question: "Set with no elements:", options: ["Empty set", "Universal", "Singleton", "Power set"], correctAnswer: 0, explanation: "Phi." },
            { question: "Power set of {1,2} has size:", options: ["4", "2", "3", "1"], correctAnswer: 0, explanation: "2^n = 2^2 = 4." },
            { question: "Relation is equivalence if:", options: ["Reflexive, Sym, Trans", "Reflexive only", "Sym only", "None"], correctAnswer: 0, explanation: "RST properties." },
            { question: "Function is one-to-one if:", options: ["f(x)=f(y) implies x=y", "f(x)!=f(y)", "Onto", "None"], correctAnswer: 0, explanation: "Injective." },
            { question: "Pigeonhole principle states:", options: ["If n items > k bins, one bin has >1", "Equal distribution", "None", "Empty bins"], correctAnswer: 0, explanation: "Basic counting." },
            { question: "Graph with no cycles:", options: ["Tree", "Cyclic", "Complete", "Mesh"], correctAnswer: 0, explanation: "Acyclic graph." },
            { question: "Euler path visits:", options: ["Every edge once", "Every vertex once", "Some edges", "None"], correctAnswer: 0, explanation: "Edge traversal." },
            { question: "Hamiltonian path visits:", options: ["Every vertex once", "Every edge", "Root", "None"], correctAnswer: 0, explanation: "Vertex traversal." },
            { question: "Chromatic number:", options: ["Min colors for vertices", "Max colors", "Edges count", "None"], correctAnswer: 0, explanation: "Coloring problem." }
        ]
    },

    // ==========================================
    // DATABASE MANAGEMENT SYSTEMS (DBMS)
    // ==========================================
    {
        subject: "Database Management Systems (DBMS)",
        unit: 1,
        questions: [
            { question: "DBMS stands for:", options: ["Database Mgmt System", "Data Basic Mgmt", "Data Bus", "None"], correctAnswer: 0, explanation: "Acronym." },
            { question: "Relational model uses:", options: ["Tables", "Trees", "Graphs", "Files"], correctAnswer: 0, explanation: "Rows and Columns." },
            { question: "Primary key must be:", options: ["Unique & Not Null", "Null", "Duplicate", "Any"], correctAnswer: 0, explanation: "Entity integrity." },
            { question: "Foreign key represents:", options: ["Relationship", "Attribute", "Entity", "None"], correctAnswer: 0, explanation: "Referential integrity." },
            { question: "SQL DDL command:", options: ["CREATE", "SELECT", "INSERT", "UPDATE"], correctAnswer: 0, explanation: "Definition Language." },
            { question: "SQL DML command:", options: ["SELECT", "CREATE", "DROP", "ALTER"], correctAnswer: 0, explanation: "Manipulation Language." },
            { question: "Normalization reduces:", options: ["Redundancy", "Data", "Tables", "Security"], correctAnswer: 0, explanation: "Efficient design." },
            { question: "ACID properties are for:", options: ["Transactions", "Tables", "Views", "Users"], correctAnswer: 0, explanation: "Atomicity, Consistency, Isolation, Durability." },
            { question: "ER diagram represents:", options: ["Conceptual view", "Physical", "Logical", "Data"], correctAnswer: 0, explanation: "Entity Relationship." },
            { question: "View in SQL is:", options: ["Virtual table", "Real table", "Index", "Log"], correctAnswer: 0, explanation: "Saved query." }
        ]
    },

    // ==========================================
    // OPERATING SYSTEMS (OS)
    // ==========================================
    {
        subject: "Operating Systems (OS)",
        unit: 1,
        questions: [
            { question: "Core of OS is:", options: ["Kernel", "Shell", "User", "Hardware"], correctAnswer: 0, explanation: "Central part." },
            { question: "Process is:", options: ["Program in execution", "Text file", "Hardware", "None"], correctAnswer: 0, explanation: "Active entity." },
            { question: "Context switch is:", options: ["Saving/Restoring state", "Turning off", "Booting", "Login"], correctAnswer: 0, explanation: "Switching CPU." },
            { question: "PCB stands for:", options: ["Process Control Block", "Program C Block", "Process Count", "None"], correctAnswer: 0, explanation: "Process metadata." },
            { question: "Deadlock condition:", options: ["Circular wait", "No wait", "Preemption", "None"], correctAnswer: 0, explanation: "Coffman conditions." },
            { question: "Semaphore is:", options: ["Integer variable", "String", "File", "Hardware"], correctAnswer: 0, explanation: "Synchronization." },
            { question: "Page making is used in:", options: ["Memory Mgmt", "Process Mgmt", "Disk", "Network"], correctAnswer: 0, explanation: "Virtual memory." },
            { question: "Fragmentation types:", options: ["Internal/External", "Up/Down", "Left/Right", "None"], correctAnswer: 0, explanation: "Memory waste." },
            { question: "Scheduler selects:", options: ["Process to run", "Memory", "Disk", "User"], correctAnswer: 0, explanation: "CPU scheduling." },
            { question: "Thread is:", options: ["Lightweight process", "Heavy process", "OS", "Hardware"], correctAnswer: 0, explanation: "Execution unit." }
        ]
    },

    // ==========================================
    // SOFTWARE ENGINEERING (SE)
    // ==========================================
    {
        subject: "Software Engineering (SE)",
        unit: 1,
        questions: [
            { question: "SDLC stands for:", options: ["Software Dev Life Cycle", "System Design", "Software Design", "None"], correctAnswer: 0, explanation: "Process." },
            { question: "Waterfall model is:", options: ["Linear", "Iterative", "Spiral", "Agile"], correctAnswer: 0, explanation: "Sequential." },
            { question: "Agile emphasizes:", options: ["Customer collaboration", "Documentation", "Contract", "Tools"], correctAnswer: 0, explanation: "Manifesto." },
            { question: "SRS document:", options: ["Requirements", "Design", "Code", "Test"], correctAnswer: 0, explanation: "Software Req Spec." },
            { question: "Black box testing checks:", options: ["Functionality", "Code", "Logic", "Structure"], correctAnswer: 0, explanation: "Input/Output." },
            { question: "White box testing checks:", options: ["Internal logic", "UI", "Requirements", "Docs"], correctAnswer: 0, explanation: "Code structure." },
            { question: "Cohesion should be:", options: ["High", "Low", "Zero", "None"], correctAnswer: 0, explanation: "Module strength." },
            { question: "Coupling should be:", options: ["Low", "High", "Max", "None"], correctAnswer: 0, explanation: "Dependency." },
            { question: "UML stands for:", options: ["Unified Modeling Language", "Universal Map", "User Mode", "None"], correctAnswer: 0, explanation: "Diagrams." },
            { question: "Regression testing is:", options: ["Re-testing after changes", "New testing", "Unit testing", "None"], correctAnswer: 0, explanation: "Ensure no breakage." }
        ]
    },

    // ==========================================
    // BEFA
    // ==========================================
    {
        subject: "Business Economics and Financial Analysis (BEFA)",
        unit: 1,
        questions: Array.from({ length: 5 }, (_, i) => ({ question: `Economics Q${i + 1}`, options: ["Demand", "Supply", "Cost", "Market"], correctAnswer: 0, explanation: "Basic econ." }))
    }
];

module.exports = year2Sem2Questions;
