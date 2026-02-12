const year2Sem1Questions = [
    // ==========================================
    // DIGITAL LOGIC DESIGN (DLD)
    // ==========================================
    {
        subject: "Digital Logic Design (DLD)",
        unit: 1,
        questions: [
            { question: "Base of Hexadecimal number system is:", options: ["8", "10", "16", "2"], correctAnswer: 2, explanation: "0-9 and A-F." },
            { question: "2's complement of 1011 is:", options: ["0100", "0101", "1011", "1100"], correctAnswer: 1, explanation: "Invert bits (0100) + 1 = 0101." },
            { question: "Universal gates are:", options: ["AND, OR", "NAND, NOR", "XOR, XNOR", "NOT, BUFFER"], correctAnswer: 1, explanation: "Can implement any boolean function." },
            { question: "Simplified form of A + AB is:", options: ["A", "B", "AB", "A+B"], correctAnswer: 0, explanation: "Absorption law: A(1+B) = A." },
            { question: "Gray code for binary 1010 is:", options: ["1111", "1100", "1011", "1001"], correctAnswer: 0, explanation: "XOR adjacent bits." },
            { question: "DeMorgan's Law (AB)' equals:", options: ["A' + B'", "A' B'", "A + B", "A' + B"], correctAnswer: 0, explanation: "NAND is Bubbled OR." },
            { question: "Number of cells in 4-variable K-Map:", options: ["4", "8", "12", "16"], correctAnswer: 3, explanation: "2^4 = 16." },
            { question: "Parity bit is used for:", options: ["Error correction", "Error detection", "Encryption", "Compression"], correctAnswer: 1, explanation: "Detects single bit errors." },
            { question: "Excess-3 code is:", options: ["Weighted", "Non-weighted", "Sequential", "Cyclic"], correctAnswer: 1, explanation: "No weights assigned." },
            { question: "XOR gate output is high when:", options: ["Inputs are same", "Inputs are different", "All low", "All high"], correctAnswer: 1, explanation: "Odd parity detector." }
        ]
    },
    {
        subject: "Digital Logic Design (DLD)",
        unit: 2, // Combinational Circuits
        questions: [
            { question: "Half adder adds:", options: ["2 bits", "3 bits", "4 bits", "1 bit"], correctAnswer: 0, explanation: "Sum and Carry." },
            { question: "Full adder can be made using:", options: ["2 Half Adders + OR", "2 Half Adders + AND", "1 Half Adder", "None"], correctAnswer: 0, explanation: "Standard construction." },
            { question: "Multiplexer is:", options: ["Many to One", "One to Many", "One to One", "Many to Many"], correctAnswer: 0, explanation: "Data selector." },
            { question: "Demultiplexer is:", options: ["Encoder", "Decoder", "Data Distributor", "Mux"], correctAnswer: 2, explanation: "One to Many." },
            { question: "Encoder converts:", options: ["Binary to Decimal", "Decimal to Binary", "High to Low", "None"], correctAnswer: 1, explanation: "Active line to encoded output." },
            { question: "Decoder with n inputs has max outputs:", options: ["n", "2n", "2^n", "n^2"], correctAnswer: 2, explanation: "2 to 4, 3 to 8 etc." },
            { question: "Priority encoder handles:", options: ["Multiple inputs high", "No inputs high", "Only one input", "None"], correctAnswer: 0, explanation: "Encodes highest priority." },
            { question: "Code converter example:", options: ["Binary to Gray", "Adder", "Subtractor", "ALU"], correctAnswer: 0, explanation: "Translates codes." },
            { question: "Look Ahead Carry Generator is:", options: ["Slower", "Faster", "Same speed", "Larger"], correctAnswer: 1, explanation: "Reduces propagation delay." },
            { question: "Comparator compares:", options: ["Magnitudes", "Phase", "Frequency", "Time"], correctAnswer: 0, explanation: "A>B, A<B, A=B." }
        ]
    },
    // DLD Unit 3, 4, 5 placeholdeers
    { subject: "Digital Logic Design (DLD)", unit: 3, questions: [{ question: "Flip Flop is:", options: ["Bistable", "Monostable", "Astable", "None"], correctAnswer: 0, explanation: "Memory element." }] },
    { subject: "Digital Logic Design (DLD)", unit: 4, questions: [{ question: "Counter type:", options: ["Sync/Async", "Linear", "Circle", "None"], correctAnswer: 0, explanation: "Ripple vs Synchronous." }] },
    { subject: "Digital Logic Design (DLD)", unit: 5, questions: [{ question: "Logic Family fastest:", options: ["TTL", "ECL", "CMOS", "RTL"], correctAnswer: 1, explanation: "Emitter Coupled Logic." }] },

    // ==========================================
    // DATA STRUCTURES (DS)
    // ==========================================
    {
        subject: "Data Structures (DS)",
        unit: 1,
        questions: [
            { question: "Linear data structure example:", options: ["Tree", "Graph", "Stack", "Map"], correctAnswer: 2, explanation: "Sequential organization." },
            { question: "Time complexity of binary search:", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], correctAnswer: 1, explanation: "Halves search space." },
            { question: "Stack follows:", options: ["LIFO", "FIFO", "LILO", "None"], correctAnswer: 0, explanation: "Last In First Out." },
            { question: "Queue follows:", options: ["LIFO", "FIFO", "Random", "Priority"], correctAnswer: 1, explanation: "First In First Out." },
            { question: "Linked list node contains:", options: ["Data only", "Address only", "Data and Address", "None"], correctAnswer: 2, explanation: "Value + Next pointer." },
            { question: "Access time of array:", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], correctAnswer: 0, explanation: "Direct indexing." },
            { question: "Double linked list allows traversal in:", options: ["One direction", "Both directions", "No direction", "Random"], correctAnswer: 1, explanation: "Prev and Next pointers." },
            { question: "Circular queue solves:", options: ["Underflow", "Overflow", "Memory wastage", "Sorting"], correctAnswer: 2, explanation: "Reuses empty spaces." },
            { question: "Infix to Postfix uses:", options: ["Queue", "Stack", "Array", "Tree"], correctAnswer: 1, explanation: "Operator precedence handling." },
            { question: "Recursion uses system:", options: ["Queue", "Stack", "Heap", "Cache"], correctAnswer: 1, explanation: "Call stack." }
        ]
    },
    {
        subject: "Data Structures (DS)",
        unit: 2,
        questions: [
            { question: "Tree is:", options: ["Linear", "Non-linear", "Circular", "Sequential"], correctAnswer: 1, explanation: "Hierarchical." },
            { question: "Root node has:", options: ["No parent", "No child", "One parent", "Two parents"], correctAnswer: 0, explanation: "Top most node." },
            { question: "Binary tree max children:", options: ["1", "2", "3", "Infinite"], correctAnswer: 1, explanation: "Left and Right." },
            { question: "Inorder traversal:", options: ["L-Ro-R", "Ro-L-R", "L-R-Ro", "None"], correctAnswer: 0, explanation: "Left, Root, Right." },
            { question: "BST property:", options: ["Left < Root < Right", "Left > Root", "Random", "Equal"], correctAnswer: 0, explanation: "Ordered." },
            { question: "Height of balanced BST:", options: ["O(n)", "O(log n)", "O(1)", "O(n^2)"], correctAnswer: 1, explanation: "Minimized depth." },
            { question: "Leaf node has:", options: ["0 children", "1 child", "2 children", "Any"], correctAnswer: 0, explanation: "Terminal node." },
            { question: "AVL tree is:", options: ["Self-balancing", "Unbalanced", "Heap", "Graph"], correctAnswer: 0, explanation: "Height difference <= 1." },
            { question: "Complete binary tree filled from:", options: ["Right to Left", "Left to Right", "Bottom Up", "Random"], correctAnswer: 1, explanation: "Level wise." },
            { question: "Heap data structure used in:", options: ["Priority Queue", "Stack", "List", "Map"], correctAnswer: 0, explanation: "Min/Max element access." }
        ]
    },
    // DS Units 3,4,5 placeholders
    { subject: "Data Structures (DS)", unit: 3, questions: [{ question: "Graph traversal:", options: ["BFS/DFS", "LIFO", "FIFO", "Sorting"], correctAnswer: 0, explanation: "Breadth/Depth First." }] },
    { subject: "Data Structures (DS)", unit: 4, questions: [{ question: "Hashing collision resolution:", options: ["Chaining", "Sorting", "Deleting", "Ignoring"], correctAnswer: 0, explanation: "Linked list at index." }] },
    { subject: "Data Structures (DS)", unit: 5, questions: [{ question: "RB Tree color:", options: ["Red/Black", "Blue/Green", "White", "None"], correctAnswer: 0, explanation: "Balancing property." }] },

    // ==========================================
    // COMPUTER ORGANIZATION AND ARCHITECTURE (COA)
    // ==========================================
    {
        subject: "Computer Organization and Architecture (COA)",
        unit: 1,
        questions: [
            { question: "Von Neumann architecture has:", options: ["Shared memory", "Separate memory", "No memory", "Cache only"], correctAnswer: 0, explanation: "Data and Instructions in same memory." },
            { question: "CPU consists of:", options: ["ALU + CU", "RAM + ROM", "Disk + Tape", "None"], correctAnswer: 0, explanation: "Arithmetic Logic Unit + Control Unit." },
            { question: "PC register holds:", options: ["Current instruction", "Next instruction address", "Data", "Status"], correctAnswer: 1, explanation: "Program Counter." },
            { question: "MAR stands for:", options: ["Memory Address Register", "Main Access RAM", "Member Area", "None"], correctAnswer: 0, explanation: "Address bus interface." },
            { question: "Bus connecting CPU and Memory:", options: ["System Bus", "Universal Bus", "Local Bus", "None"], correctAnswer: 0, explanation: "Address, Data, Control." },
            { question: "Opcod specifies:", options: ["Operation to be performed", "Address", "Data", "Register"], correctAnswer: 0, explanation: "What to do." },
            { question: "Indirect addressing mode:", options: ["Address contains address", "Direct value", "Register", "Stack"], correctAnswer: 0, explanation: "Pointer chasing." },
            { question: "Interrupts are:", options: ["Hardware/Software signals", "Errors", "Loops", "Variables"], correctAnswer: 0, explanation: "Halt normal execution." },
            { question: "DMA stands for:", options: ["Direct Memory Access", "Dual Mode Access", "Data Memory Area", "None"], correctAnswer: 0, explanation: "IO to Memory without CPU." },
            { question: "Stack pointer points to:", options: ["Top of stack", "Bottom", "Middle", "Null"], correctAnswer: 0, explanation: "LIFO access." }
        ]
    },
    // COA Placeholders for 2-5
    { subject: "Computer Organization and Architecture (COA)", unit: 2, questions: [{ question: "Microinstruction is:", options: ["Low level control", "High level", "C++", "Java"], correctAnswer: 0, explanation: "Control words." }] },
    { subject: "Computer Organization and Architecture (COA)", unit: 3, questions: [{ question: "Cache memory is:", options: ["Faster than RAM", "Slower", "Same", "Cheap"], correctAnswer: 0, explanation: "SRAM." }] },
    { subject: "Computer Organization and Architecture (COA)", unit: 4, questions: [{ question: "Virtual memory uses:", options: ["Paging", "Sorting", "Hashing", "None"], correctAnswer: 0, explanation: "Disk as RAM extension." }] },
    { subject: "Computer Organization and Architecture (COA)", unit: 5, questions: [{ question: "Pipeline increases:", options: ["Throughput", "Latency", "Size", "Cost"], correctAnswer: 0, explanation: "Parallel processing." }] },

    // ==========================================
    // JAVA (OOP)
    // ==========================================
    {
        subject: "Object Oriented Programming Through Java",
        unit: 1,
        questions: [
            { question: "Java is:", options: ["Platform Independent", "Dependent", "Machine code", "Assembly"], correctAnswer: 0, explanation: "Bytecode runs on JVM." },
            { question: "Entry point of Java program:", options: ["main()", "start()", "init()", "run()"], correctAnswer: 0, explanation: "public static void main." },
            { question: "Which is not an OOP feature?", options: ["Pointers", "Inheritance", "Polymorphism", "Encapsulation"], correctAnswer: 0, explanation: "Java removed pointers for safety." },
            { question: "Size of int in Java:", options: ["4 bytes", "2 bytes", "8 bytes", "Depends on OS"], correctAnswer: 0, explanation: "Fixed size unlike C." },
            { question: "Constructor name must be:", options: ["Same as class", "Different", "void", "Any"], correctAnswer: 0, explanation: "Initialization." },
            { question: "keyword 'this' refers to:", options: ["Current object", "Parent class", "Child class", "None"], correctAnswer: 0, explanation: "Self reference." },
            { question: "Method overloading is:", options: ["Compile time poly", "Run time poly", "Inheritance", "None"], correctAnswer: 0, explanation: "Same name diff params." },
            { question: "Static variable shared by:", options: ["All objects", "One object", "None", "Main"], correctAnswer: 0, explanation: "Class level." },
            { question: "Garbage collection in Java is:", options: ["Automatic", "Manual", "Not present", "None"], correctAnswer: 0, explanation: "JVM handles it." },
            { question: "String in Java is:", options: ["Immutable", "Mutable", "Char array", "None"], correctAnswer: 0, explanation: "Cannot change once created." }
        ]
    },
    // Java Unit 2-5 placeholders
    { subject: "Object Oriented Programming Through Java", unit: 2, questions: [{ question: "Inheritance keyword:", options: ["extends", "implements", "super", "this"], correctAnswer: 0, explanation: "Class A extends B." }] },
    { subject: "Object Oriented Programming Through Java", unit: 3, questions: [{ question: "Exception handling keywords:", options: ["try, catch, throw", "if, else", "switch", "for"], correctAnswer: 0, explanation: "Error management." }] },
    { subject: "Object Oriented Programming Through Java", unit: 4, questions: [{ question: "Thread class in package:", options: ["java.lang", "java.util", "java.io", "java.net"], correctAnswer: 0, explanation: "Built-in." }] },
    { subject: "Object Oriented Programming Through Java", unit: 5, questions: [{ question: "Applet is:", options: ["Web based", "Console", "Mobile", "None"], correctAnswer: 0, explanation: "Runs in browser (Legacy)." }] },

    // ==========================================
    // COSM (Stats)
    // ==========================================
    {
        subject: "Computer Oriented Statistical Methods (COSM)",
        unit: 1,
        questions: Array.from({ length: 5 }, (_, i) => ({ question: `Stats Q${i + 1}`, options: ["Mean", "Median", "Mode", "Range"], correctAnswer: 0, explanation: "Basic stat concept." }))
    }
];

module.exports = year2Sem1Questions;
