const year3Sem1Questions = [
    // ==========================================
    // COMPUTER NETWORKS (CN)
    // ==========================================
    {
        subject: "Computer Networks",
        unit: 1,
        questions: [
            { question: "OSI model has how many layers?", options: ["4", "5", "6", "7"], correctAnswer: 3, explanation: "Physical to Application." },
            { question: "TCP/IP model layer corresponding to OSI Session+Presentation+Application:", options: ["Application", "Transport", "Internet", "Network Access"], correctAnswer: 0, explanation: "Combined." },
            { question: "Physical layer unit:", options: ["Bit", "Frame", "Packet", "Segment"], correctAnswer: 0, explanation: "Raw bits." },
            { question: "Data Link layer unit:", options: ["Bit", "Frame", "Packet", "Segment"], correctAnswer: 1, explanation: "Framing." },
            { question: "Network layer unit:", options: ["Bit", "Frame", "Packet", "Segment"], correctAnswer: 2, explanation: "IP Packets." },
            { question: "Transport layer unit:", options: ["Bit", "Frame", "Packet", "Segment"], correctAnswer: 3, explanation: "TCP Segments." },
            { question: "Hub operates at:", options: ["Physical", "Data Link", "Network", "Transport"], correctAnswer: 0, explanation: "Layer 1 device." },
            { question: "Switch operates at:", options: ["Physical", "Data Link", "Network", "Transport"], correctAnswer: 1, explanation: "Layer 2 device." },
            { question: "Router operates at:", options: ["Physical", "Data Link", "Network", "Transport"], correctAnswer: 2, explanation: "Layer 3 device." },
            { question: "Topology with central controller:", options: ["Star", "Mesh", "Bus", "Ring"], correctAnswer: 0, explanation: "Hub/Switch at center." }
        ]
    },
    {
        subject: "Computer Networks",
        unit: 2,
        questions: [
            { question: "Error detection method:", options: ["CRC", "DNS", "FTP", "HTTP"], correctAnswer: 0, explanation: "Cyclic Redundancy Check." },
            { question: "Hamming code is used for:", options: ["Error correction", "Encryption", "Routing", "None"], correctAnswer: 0, explanation: "Single bit correction." },
            { question: "Stop and Wait ARQ is:", options: ["Flow control", "Error control", "Both", "None"], correctAnswer: 2, explanation: "Wait for ACK." },
            { question: "Sliding Window protocol improves:", options: ["Efficiency", "Latency", "Cost", "None"], correctAnswer: 0, explanation: "Pipelining." },
            { question: "Go-Back-N ARQ retransmits:", options: ["N frames", "1 frame", "All frames", "None"], correctAnswer: 0, explanation: "Cumulative ACK." },
            { question: "Selective Repeat ARQ retransmits:", options: ["Only error frames", "All frames", "N frames", "None"], correctAnswer: 0, explanation: "Efficient." },
            { question: "MAC address length:", options: ["32 bits", "48 bits", "64 bits", "128 bits"], correctAnswer: 1, explanation: "6 bytes." },
            { question: "CSMA/CD is used in:", options: ["Ethernet", "WiFi", "Bluetooth", "Token Ring"], correctAnswer: 0, explanation: "Collision Detection." },
            { question: "Aloha is:", options: ["Random access", "Controlled access", "Channelization", "None"], correctAnswer: 0, explanation: "Radio based." },
            { question: "VLAN stands for:", options: ["Virtual LAN", "Very LAN", "Video LAN", "None"], correctAnswer: 0, explanation: "Logical grouping." }
        ]
    },

    // ==========================================
    // DESIGN AND ANALYSIS OF ALGORITHMS (DAA)
    // ==========================================
    {
        subject: "Design And Analysis Of Algorithms",
        unit: 1,
        questions: [
            { question: "Big O notation represents:", options: ["Upper bound", "Lower bound", "Tight bound", "Average"], correctAnswer: 0, explanation: "Worst case." },
            { question: "Merge Sort complexity:", options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"], correctAnswer: 1, explanation: "Divide and conquer." },
            { question: "Quick Sort worst case:", options: ["O(n)", "O(n log n)", "O(n^2)", "O(1)"], correctAnswer: 2, explanation: "Pivot selection." },
            { question: "Binary Search strategy:", options: ["Divide and Conquer", "Greedy", "Dynamic", "Backtracking"], correctAnswer: 0, explanation: "Halving." },
            { question: "Master Theorem solves:", options: ["Recurrences", "Sorting", "Searching", "Graph"], correctAnswer: 0, explanation: "T(n) = aT(n/b) + f(n)." },
            { question: "Strassen's Matrix Multiplication uses:", options: ["Divide and Conquer", "Greedy", "DP", "None"], correctAnswer: 0, explanation: "Faster than cubic." },
            { question: "Space complexity of Quick Sort:", options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], correctAnswer: 1, explanation: "Stack space." },
            { question: "Stable sort example:", options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"], correctAnswer: 0, explanation: "Preserves order." },
            { question: "In-place sort example:", options: ["Quick Sort", "Merge Sort", "Radix Sort", "None"], correctAnswer: 0, explanation: "Minimal extra space." },
            { question: "Worst case of linear search:", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], correctAnswer: 0, explanation: "Last element." }
        ]
    },
    {
        subject: "Design And Analysis Of Algorithms",
        unit: 2, // Greedy & DP placeholder
        questions: [
            { question: "Knapsack (Fractional) strategy:", options: ["Greedy", "DP", "Backtracking", "Brute Force"], correctAnswer: 0, explanation: "Value/Weight ratio." },
            { question: "0/1 Knapsack strategy:", options: ["Greedy", "Dynamic Programming", "Divide and conquer", "None"], correctAnswer: 1, explanation: "Optimal substructure." },
            { question: "Prim's algorithm finds:", options: ["MST", "Shortest path", "Max flow", "Sorting"], correctAnswer: 0, explanation: "Minimum Spanning Tree." },
            { question: "Kruskal's algorithm finds:", options: ["MST", "Shortest path", "Max flow", "Sorting"], correctAnswer: 0, explanation: "Minimum Spanning Tree." },
            { question: "Dijkstra's algorithm finds:", options: ["Shortest path", "MST", "Max flow", "Components"], correctAnswer: 0, explanation: "From source." },
            { question: "Bellman-Ford works with:", options: ["Negative weights", "Positive only", "Cycles", "None"], correctAnswer: 0, explanation: "Can detect neg cycles." },
            { question: "Floyd-Warshall is for:", options: ["All pairs shortest path", "Single source", "MST", "Max Flow"], correctAnswer: 0, explanation: "O(V^3)." },
            { question: "Huffman coding uses:", options: ["Greedy", "DP", "Backtracking", "None"], correctAnswer: 0, explanation: "Compression." },
            { question: "Job sequencing with deadlines uses:", options: ["Greedy", "DP", "Backtracking", "None"], correctAnswer: 0, explanation: "Profit max." },
            { question: "Optimal binary search tree uses:", options: ["DP", "Greedy", "D&C", "None"], correctAnswer: 0, explanation: "Min cost." }
        ]
    },

    // ==========================================
    // DEVOPS
    // ==========================================
    {
        subject: "DevOps",
        unit: 1,
        questions: [
            { question: "DevOps is combination of:", options: ["Dev + Ops", "Dev + QA", "Ops + Sec", "None"], correctAnswer: 0, explanation: "Collaboration." },
            { question: "CI stands for:", options: ["Continuous Integration", "Continuous Improvement", "Code Integration", "None"], correctAnswer: 0, explanation: "Merge frequently." },
            { question: "CD stands for:", options: ["Continuous Delivery/Deployment", "Code Design", "Continuous Design", "None"], correctAnswer: 0, explanation: "Automated release." },
            { question: "Version control tool:", options: ["Git", "Jenkins", "Docker", "Nagios"], correctAnswer: 0, explanation: "Source code mgmt." },
            { question: "CI tool:", options: ["Jenkins", "Git", "Docker", "Ansible"], correctAnswer: 0, explanation: "Automation server." },
            { question: "Containerization tool:", options: ["Docker", "Git", "Jenkins", "Puppet"], correctAnswer: 0, explanation: "Lightweight VM." },
            { question: "Configuration Management tool:", options: ["Ansible", "Git", "Docker", "Selenium"], correctAnswer: 0, explanation: "Infra as code." },
            { question: "Monitoring tool:", options: ["Nagios", "Git", "Jenkins", "Maven"], correctAnswer: 0, explanation: "Health checks." },
            { question: "Infrastructure as Code (IaC):", options: ["Managing infra via code", "Manual setup", "GUI setup", "None"], correctAnswer: 0, explanation: "Reproducibility." },
            { question: "Agile + DevOps:", options: ["Complementary", "Opposite", "Same", "Unrelated"], correctAnswer: 0, explanation: "Agile values." }
        ]
    },

    // ==========================================
    // INFORMATION RETRIEVAL SYSTEM (IRS)
    // ==========================================
    {
        subject: "Information Retrieval System",
        unit: 1,
        questions: [
            { question: "IRS main goal:", options: ["Retrieve relevant info", "Store data", "Calculate stats", "None"], correctAnswer: 0, explanation: "Relevance." },
            { question: "Precision is:", options: ["Relevant Retrieved / Retrieved", "Retrieved / Relevant", "Relevant / Total", "None"], correctAnswer: 0, explanation: "Exactness." },
            { question: "Recall is:", options: ["Relevant Retrieved / Total Relevant", "Retrieved / Total", "None", "Accuracy"], correctAnswer: 0, explanation: "Completeness." },
            { question: "Inverted Index stores:", options: ["Term -> Documents", "Document -> Terms", "None", "Both"], correctAnswer: 0, explanation: "Fast search." },
            { question: "Stemming is:", options: ["Reducing word to root", "Expanding word", "Deleting word", "None"], correctAnswer: 0, explanation: "Normalization." },
            { question: "Stop words are:", options: ["Common words removed", "Important words", "Rare words", "None"], correctAnswer: 0, explanation: "the, a, and." },
            { question: "Boolean retrieval model uses:", options: ["AND, OR, NOT", "Probabilities", "Vectors", "None"], correctAnswer: 0, explanation: "Exact match." },
            { question: "Vector Space Model uses:", options: ["Cosine similarity", "Boolean", "Probability", "None"], correctAnswer: 0, explanation: "Ranking." },
            { question: "TF-IDF stands for:", options: ["Term Freq - Inv Doc Freq", "Total Freq", "None", "Text Freq"], correctAnswer: 0, explanation: "Weighting." },
            { question: "Web Crawler is used for:", options: ["Fetching web pages", "Indexing", "Querying", "Ranking"], correctAnswer: 0, explanation: "Spider." }
        ]
    },

    // ==========================================
    // PRINCIPLES OF PROGRAMMING LANGUAGES (PPL)
    // ==========================================
    {
        subject: "Principles of Programming Languages",
        unit: 1,
        questions: [
            { question: "Syntax refers to:", options: ["Structure/Grammar", "Meaning", "Runtime", "None"], correctAnswer: 0, explanation: "Form." },
            { question: "Semantics refers to:", options: ["Meaning", "Structure", "Speed", "Size"], correctAnswer: 0, explanation: "Logic." },
            { question: "BNF stands for:", options: ["Backus Naur Form", "Binary Normal Form", "Basic New Format", "None"], correctAnswer: 0, explanation: "Grammar notation." },
            { question: "Imperative language example:", options: ["C", "SQL", "Prolog", "Haskell"], correctAnswer: 0, explanation: "Step by step." },
            { question: "Functional language example:", options: ["Haskell", "C", "Java", "Python"], correctAnswer: 0, explanation: "Functions." },
            { question: "Logical language example:", options: ["Prolog", "C", "Java", "Lisp"], correctAnswer: 0, explanation: "Facts and rules." },
            { question: "Compilation converts:", options: ["Source to Machine", "Machine to Source", "None", "Run"], correctAnswer: 0, explanation: "Translation." },
            { question: "Interpretation executes:", options: ["Line by line", "Whole block", "None", "Binary"], correctAnswer: 0, explanation: "Scripting." },
            { question: "Binding time is:", options: ["When attribute is associated", "Compile time only", "Run time only", "None"], correctAnswer: 0, explanation: "Association." },
            { question: "Scope of variable:", options: ["Visibility region", "Lifetime", "Type", "Value"], correctAnswer: 0, explanation: "Where accessible." }
        ]
    }
];

module.exports = year3Sem1Questions;
