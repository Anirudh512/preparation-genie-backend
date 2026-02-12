const syllabusSubjects = {
    "B.Tech-I-I Sem": [
        "Matrices and Calculus",
        "Engineering Chemistry",
        "Programming for Problem Solving",
        "Computer Aided Engineering Graphics",
        "Basic Electronic Engineering",
    ],
    "B.Tech-I-II Sem": [
        "Ordinary Differential Equations and Vector Calculus",
        "Applied Physics",
        "Electronic Devices and Circuits (EDC)",
        "English for Skill Enhancement",
        "Probability and Statistics"
    ],
    "B.Tech-II-I Sem": [
        "Digital Logic Design (DLD)",
        "Data Structures (DS)",
        "Computer Oriented Statistical Methods (COSM)",
        "Computer Organization and Architecture (COA)",
        "Object Oriented Programming Through Java"
    ],
    "B.Tech-II-II Sem": [
        "Discrete Mathematics (DM)",
        "Business Economics and Financial Analysis (BEFA)",
        "Database Management Systems (DBMS)",
        "Operating Systems (OS)",
        "Software Engineering (SE)"
    ],
    "B.Tech-III-I Sem": [
        "Computer Networks",
        "Information Retrieval System",
        "Design And Analysis Of Algorithms",
        "Principles of Programming Languages",
        "DevOps"
    ],
    "B.Tech-III-II Sem": [
        "Machine Learning",
        "Fundamental Of Artificial Intelligence",
        "Artificial Intelligence",
        "Formal Languages and Automata Theory",
        "Mobile Application Development"
    ],
    "B.Tech-IV-I Sem": [
        "Predictive Analytics",
        "Scripting Languages",
    ],
    "B.Tech-IV-II Sem": [
        "Video Analytics",
        "Introduction to Social Media Mining",
        "Data Visualization Using Python",
    ],
};

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

module.exports = { syllabusSubjects, subjectUnitsMap };
