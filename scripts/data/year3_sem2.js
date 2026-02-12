const year3Sem2Questions = [
    // ==========================================
    // MACHINE LEARNING (ML)
    // ==========================================
    {
        subject: "Machine Learning",
        unit: 1,
        questions: [
            { question: "Supervised learning uses:", options: ["Labeled data", "Unlabeled data", "Rewards", "None"], correctAnswer: 0, explanation: "Input-Output pairs." },
            { question: "Unsupervised learning uses:", options: ["Unlabeled data", "Labeled data", "Rewards", "None"], correctAnswer: 0, explanation: "Patterns/Clustering." },
            { question: "Reinforcement learning uses:", options: ["Rewards/Penalties", "Labels", "Clusters", "None"], correctAnswer: 0, explanation: "Agent environment." },
            { question: "Regression predicts:", options: ["Continuous value", "Class label", "Cluster", "None"], correctAnswer: 0, explanation: "Numerical output." },
            { question: "Classification predicts:", options: ["Discrete label", "Continuous value", "None", "Prob"], correctAnswer: 0, explanation: "Category." },
            { question: "Overfitting means:", options: ["Low training error, High test error", "High training error", "Good fit", "None"], correctAnswer: 0, explanation: "Memorization." },
            { question: "Underfitting means:", options: ["High training error", "Low training error", "Good fit", "None"], correctAnswer: 0, explanation: "Too simple model." },
            { question: "Decision Tree nodes represent:", options: ["Features", "Classes", "Rules", "None"], correctAnswer: 0, explanation: "Splits." },
            { question: "Entropy measures:", options: ["Impurity", "Purity", "Gain", "None"], correctAnswer: 0, explanation: "Randomness." },
            { question: "KNN algorithm is:", options: ["Lazy learner", "Eager learner", "fast", "None"], correctAnswer: 0, explanation: "Stores data." }
        ]
    },

    // ==========================================
    // ARTIFICIAL INTELLIGENCE (AI)
    // ==========================================
    {
        subject: "Artificial Intelligence",
        unit: 1,
        questions: [
            { question: "AI father:", options: ["McCarthy", "Turing", "Babbage", "Von Neumann"], correctAnswer: 0, explanation: "Coined term." },
            { question: "Turing Test checks:", options: ["Intelligence", "Speed", "Memory", "Power"], correctAnswer: 0, explanation: "Human-like behavior." },
            { question: "DFS uses:", options: ["Stack", "Queue", "Heap", "Tree"], correctAnswer: 0, explanation: "LIFO." },
            { question: "BFS uses:", options: ["Queue", "Stack", "List", "Tree"], correctAnswer: 0, explanation: "FIFO." },
            { question: "A* algorithm uses:", options: ["Heuristic", "Probilistic", "Random", "None"], correctAnswer: 0, explanation: "f = g + h." },
            { question: "Expert System components:", options: ["Knowledge Base + Inference Engine", "DB + SQL", "UI + Code", "None"], correctAnswer: 0, explanation: "Core parts." },
            { question: "Prolog is used for:", options: ["AI", "Web", "System", "Graphics"], correctAnswer: 0, explanation: "Logic programming." },
            { question: "Strong AI means:", options: ["Sentience", "Simulation", "Specific task", "None"], correctAnswer: 0, explanation: "Human equivalent." },
            { question: "Weak AI means:", options: ["Specific task", "Sentience", "All tasks", "None"], correctAnswer: 0, explanation: "Narrow focus." },
            { question: "Fuzzy Logic deals with:", options: ["Degrees of truth", "True/False", "Random", "None"], correctAnswer: 0, explanation: "0 to 1 continuous." }
        ]
    },

    // ==========================================
    // FORMAL LANGUAGES AND AUTOMATA THEORY (FLAT)
    // ==========================================
    {
        subject: "Formal Languages and Automata Theory",
        unit: 1,
        questions: [
            { question: "DFA stands for:", options: ["Deterministic Finite Automata", "Direct FA", "Double FA", "None"], correctAnswer: 0, explanation: "No ambiguity." },
            { question: "NFA stands for:", options: ["Non-deterministic Finite Automata", "New FA", "Null FA", "None"], correctAnswer: 0, explanation: "Multiple paths." },
            { question: "Regular language accepted by:", options: ["Finite Automata", "PDA", "Turing Machine", "LBA"], correctAnswer: 0, explanation: "Type 3." },
            { question: "CFL accepted by:", options: ["Push Down Automata", "FA", "TM", "None"], correctAnswer: 0, explanation: "Type 2." },
            { question: "CSL accepted by:", options: ["Linear Bounded Automata", "PDA", "FA", "None"], correctAnswer: 0, explanation: "Type 1." },
            { question: "Recursively Enumerable accepted by:", options: ["Turing Machine", "PDA", "FA", "None"], correctAnswer: 0, explanation: "Type 0." },
            { question: "Regular expression (a+b)* means:", options: ["Any cmb of a and b", "Effectively a", "Effectively b", "None"], correctAnswer: 0, explanation: "Kleene Star." },
            { question: "Moore machine output depends on:", options: ["State only", "State and Input", "Input only", "None"], correctAnswer: 0, explanation: "Definition." },
            { question: "Mealy machine output depends on:", options: ["State and Input", "State only", "Input only", "None"], correctAnswer: 0, explanation: "Definition." },
            { question: "Pumping Lemma used for:", options: ["Proving Non-Regularity", "Regularity", "Minimization", "None"], correctAnswer: 0, explanation: "Negative test." }
        ]
    },

    // ==========================================
    // MOBILE APPLICATION DEVELOPMENT (MAD)
    // ==========================================
    {
        subject: "Mobile Application Development",
        unit: 1,
        questions: [
            { question: "Android OS is based on:", options: ["Linux", "Windows", "Unix", "Mac"], correctAnswer: 0, explanation: "Kernel." },
            { question: "APK stands for:", options: ["Android Package Kit", "App Package", "Android Pack", "None"], correctAnswer: 0, explanation: "Extension." },
            { question: "Activity lifecycle method first called:", options: ["onCreate()", "onStart()", "onResume()", "onPause()"], correctAnswer: 0, explanation: "Initialization." },
            { question: "Layout for linear arrangement:", options: ["LinearLayout", "RelativeLayout", "ConstraintLayout", "Frame"], correctAnswer: 0, explanation: "Horizontal/Vertical." },
            { question: "Manifest file contains:", options: ["App permissions & components", "Code", "Images", "Colors"], correctAnswer: 0, explanation: "Configuration." },
            { question: "Intent is used for:", options: ["Communication between components", "Database", "UI", "None"], correctAnswer: 0, explanation: "Messaging." },
            { question: "Explicit Intent specifies:", options: ["Target component", "Action", "Category", "Data"], correctAnswer: 0, explanation: "Direct call." },
            { question: "Implicit Intent specifies:", options: ["Action", "Target", "Class", "Package"], correctAnswer: 0, explanation: "Capability request." },
            { question: "Services run in:", options: ["Background", "Foreground only", "UI thread", "None"], correctAnswer: 0, explanation: "Long running." },
            { question: "Broadcast Receiver handles:", options: ["System events", "UI", "Database", "Network"], correctAnswer: 0, explanation: "Battery low etc." }
        ]
    },

    // ==========================================
    // FUNDAMENTAL OF ARTIFICIAL INTELLIGENCE (FAI - IoT based based on syllabus)
    // ==========================================
    {
        subject: "Fundamental Of Artificial Intelligence",
        unit: 1,
        questions: Array.from({ length: 5 }, (_, i) => ({ question: `FAI/IoT Q${i + 1}`, options: ["IoT", "AI", "Cloud", "Data"], correctAnswer: 0, explanation: "IoT basics." }))
    }
];

module.exports = year3Sem2Questions;
