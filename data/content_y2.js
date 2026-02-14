module.exports = {
    // ==========================================
    // YEAR 2 SEM 1
    // ==========================================

    // --- DIGITAL LOGIC DESIGN (DLD) ---
    "Digital Logic Design (DLD)_Unit_1": `# Unit 1: Boolean Algebra & Logic Gates

## 📝 Quick Explanation
Building on BEE, DLD dives deeper into digital systems. We study binary codes (BCD, Gray, Excess-3) and canonical forms of boolean functions. Simplification is key to reducing circuit cost.

## 📌 Important Topics
- **Binary Codes**: Weighted vs Non-weighted, Gray code (Unit distance code).
- **Boolean Algebra**: Postulates, Canonical forms (Minterms/Maxterms).
- **K-Map**: 3-variable, 4-variable maps, Prime Implicants.
- **Realization**: Using NAND/NOR gates only.

## 🧠 Key Concepts
> **Gray Code**: Used in shaft encoders to prevent error.
> **Don't Care**: Conditions that never occur, used to simplify K-Maps further.
`,

    "Digital Logic Design (DLD)_Unit_2": `# Unit 2: Combinational Circuits

## 📝 Quick Explanation
Combinational circuits are those where output depends ONLY on current input (No memory). Adders perform math, Muxes select data, and Decoders translate binary to decimal/display.

## 📌 Important Topics
- **Adders/Subtractors**: Half/Full Adder, Ripple Carry Adder.
- **Multiplexer (Mux)**: Data Selector ($2^n:1$). Implementing functions using Mux.
- **Decoder/Encoder**: Binary to Decimal, Priority Encoder.
- **Comparator**: Magnitude comparator (A>B, A=B, A<B).

## 🧠 Key Concepts
> **Mux**: Universal logic circuit (Can implement any boolean function).
`,

    "Digital Logic Design (DLD)_Unit_3": `# Unit 3: Sequential Circuits

## 📝 Quick Explanation
Sequential circuits have Memory (Feedback). The output depends on current input AND past output. Flip-Flops are the 1-bit memory cells. Registers store bytes; Counters count pulses.

## 📌 Important Topics
- **Latches vs Flip-Flops**: Level vs Edge triggered.
- **Flip-Flops**: SR, JK, D (Data), T (Toggle). Excitation Tables.
- **Race Around Condition**: In JK FF (solved by Master-Slave).
- **Registers**: SIPO, PISO, Shift Registers.
- **Counters**: Asynchronous (Ripple) vs Synchronous. Ring Counter.

## 🧠 Key Concepts
> **Clock**: Synchronizing signal.
> **Master-Slave**: Two FFs cascaded to prevent racing.
`,

    "Digital Logic Design (DLD)_Unit_4": `# Unit 4: Finite State Machines (FSM)

## 📝 Quick Explanation
FSMs model systems with finite states (like a vending machine or elevator). We design them using state diagrams and state tables.

## 📌 Important Topics
- **Mealy Machine**: Output depends on State AND Input.
- **Moore Machine**: Output depends ONLY on State.
- **State Diagram/Table**: Transition logic.
- **Sequence Detector**: Designing a circuit to detect "1011".

## 🧠 Key Concepts
> **Mealy**: Reacts faster (asynchronous output change).
> **Moore**: More stable (output changes only on clock).
`,

    "Digital Logic Design (DLD)_Unit_5": `# Unit 5: Logic Families & Memories

## 📝 Quick Explanation
How are gates built physically? TTL (Transistor-Transistor Logic) and CMOS are common technologies. We also look at memory types (ROM, RAM) and PLDs (Programmable Logic Devices).

## 📌 Important Topics
- **Logic Families**: TTL (Fast, High Power) vs CMOS (Low Power). Fan-out, Noise Margin.
- **PLDs**: PROM, PLA, PAL (Programmable AND/OR planes).
- **Memory**: RAM (Static vs Dynamic), ROM.

## 🧠 Key Concepts
> **Fan-out**: Max number of inputs a gate can drive.
> **CMOS**: Dominant technology today due to low power consumption.
`,

    // --- DATA STRUCTURES (DS) ---
    "Data Structures (DS)_Unit_1": `# Unit 1: Introduction to Data Structures

## 📝 Quick Explanation
Data Structures optimize data organization. We analyze algorithms using Time and Space Complexity (Big-O). Basic linear structures like Linked Lists allow dynamic memory usage unlike Arrays.

## 📌 Important Topics
- **Algorithm Analysis**: Time Complexity, Big-O notation.
- **Linked Lists**: Singly, Doubly, Circular Linked Lists.
- **Operations**: Insertion, Deletion, Traversal.

## 🧠 Key Concepts
> **Array vs Linked List**: Array = Fast access ($O(1)$) but fixed size. List = Dynamic size but slow access ($O(n)$).
`,

    "Data Structures (DS)_Unit_2": `# Unit 2: Stacks and Queues

## 📝 Quick Explanation
Stacks (LIFO) and Queues (FIFO) are restricted linear structures. Stacks are used in recursion and undo buttons. Queues are used in printer scheduling and CPU tasks.

## 📌 Important Topics
- **Stack**: Push, Pop, Peek. Applications: Infix to Postfix, Balanced parantheses.
- **Queue**: Enqueue, Dequeue.
- **Variations**: Circular Queue (Solves unused space), Deque, Priority Queue.

## 🧠 Key Concepts
> **LIFO**: Last In First Out (Stack).
> **FIFO**: First In First Out (Queue).
`,

    "Data Structures (DS)_Unit_3": `# Unit 3: Trees

## 📝 Quick Explanation
Trees are hierarchical structures suitable for file systems and databases. Binary Trees and Binary Search Trees (BST) allow efficient searching. AVL trees self-balance to guarantee performance.

## 📌 Important Topics
- **Binary Tree**: Properties, Traversals (Inorder, Preorder, Postorder).
- **Binary Search Tree (BST)**: Left < Root < Right.
- **AVL Tree**: Height balanced trees (Rotations: LL, RR, LR, RL).
- **B-Trees**: Multi-way search trees (Used in Databases).

## 🧠 Key Concepts
> **BST Complexity**: Search is $O(\\log n)$ on average, but $O(n)$ if skewed.
> **AVL Property**: Balance factor $|H_L - H_R| \\le 1$.
`,

    "Data Structures (DS)_Unit_4": `# Unit 4: Graphs

## 📝 Quick Explanation
Graphs model networks (Social media, Maps). We study traversals (BFS, DFS) and shortest path algorithms. Spanning trees connect all nodes with min cost.

## 📌 Important Topics
- **Representation**: Adjacency Matrix vs List.
- **Traversals**: BFS (Queue), DFS (Stack/Recursion).
- **MST**: Prim's and Kruskal's algorithms.
- **Shortest Path**: Dijkstra's Algorithm, Floyd-Warshall.

## 🧠 Key Concepts
> **BFS**: Level order traversal.
> **MST**: Minimum Spanning Tree (Connects graph with min edge weight, no cycles).
`,

    "Data Structures (DS)_Unit_5": `# Unit 5: Searching & Hashing

## 📝 Quick Explanation
Efficient retrieval is the goal. Hashing provides O(1) average lookup time using a Hash Function. Sorting organizes data for binary search.

## 📌 Important Topics
- **Sorting**: Merge Sort, Quick Sort (Divide & Conquer), Heap Sort.
- **Hashing**: Hash table, Hash functions.
- **Collision Resolution**: Chaining vs Open Addressing (Linear Probing).

## 🧠 Key Concepts
> **Quick Sort**: $O(n \\log n)$ best case, $O(n^2)$ worst.
> **Hashing**: Maps large data to smaller index map.
`,

    // --- COMPUTER ORGANIZATION AND ARCHITECTURE (COA) ---
    "Computer Organization and Architecture (COA)_Unit_1": `# Unit 1: Basic Structure

## 📝 Quick Explanation
COA bridges hardware and software. We look at functional units, bus structures, and data representation (Fixed vs Floating point).

## 📌 Important Topics
- **Functional Units**: Input, Memory, ALU, Control, Output.
- **Bus Structure**: Address, Data, Control bus.
- **Data Representation**: Signed integers (2's complement), IEEE 754 Floating Point.

## 🧠 Key Concepts
> **Stored Program Concept**: Von Neumann architecture. (Instructions and Data in same memory).
`,

    "Computer Organization and Architecture (COA)_Unit_2": `# Unit 2: Machine Instructions

## 📝 Quick Explanation
How does a CPU execute 'A = B + C'? We study Instruction formats, Addressing modes (Direct, Immediate, Indirect), and assembly basics.

## 📌 Important Topics
- **Instruction Cycle**: Fetch, Decode, Execute.
- **Addressing Modes**: Immediate (#5), Register (R1), Direct (1000), Indirect (@R1).
- **Instruction Formats**: Zero, One, Two, Three address instructions.

## 🧠 Key Concepts
> **PC**: Program Counter (Address of next instruction).
> **IR**: Instruction Register (Current instruction).
`,

    "Computer Organization and Architecture (COA)_Unit_3": `# Unit 3: Processor Organization

## 📝 Quick Explanation
The CPU brain. Hardwired control is fast but rigid; Microprogrammed control is flexible but slower. Pipelining increases throughput (like an assembly line).

## 📌 Important Topics
- **Control Unit**: Hardwired vs Microprogrammed.
- **Pipelining**: Instruction pipeline (Fetch, Decode, Execute, Write).
- **Hazards**: Data, Structural, Control (Branch) hazards.

## 🧠 Key Concepts
> **Throughput**: Instructions per second.
> **Pipeline Stall**: Delay caused by hazards.
`,

    "Computer Organization and Architecture (COA)_Unit_4": `# Unit 4: Memory Organization

## 📝 Quick Explanation
Memory Hierarchy: Registers > Cache > RAM > Disk. Cache is super fast memory to hide RAM latency. Mapping techniques decide where data sits in cache.

## 📌 Important Topics
- **Memory Hierarchy**: Speed vs Cost trade-off.
- **Cache Mappings**: Direct, Associative, Set-Associative.
- **Virtual Memory**: Paging, TLB, Page replacement algorithms.

## 🧠 Key Concepts
> **Hit Rate**: % of times data is found in cache.
> **Locality of Reference**: Spatial (near data) and Temporal (recent data) locality.
`,

    "Computer Organization and Architecture (COA)_Unit_5": `# Unit 5: I/O Organization

## 📝 Quick Explanation
How CPU talks to keyboard/disk. Interrupts allow devices to demand attention. DMA (Direct Memory Access) lets disk transfer data to RAM without bothering the CPU.

## 📌 Important Topics
- **I/O Modes**: Programmed I/O (Polling), Interrupt Driven I/O.
- **Interrupts**: Vectored vs Non-vectored, Priority.
- **DMA**: DMA Controller, Cycle Stealing, Burst Mode.

## 🧠 Key Concepts
> **DMA**: Much faster for large data transfers.
> **ISR**: Interrupt Service Routine.
`,

    // --- JAVA (OOP) ---
    "Object Oriented Programming Through Java_Unit_1": `# Unit 1: OOP Concepts & Java Basics

## 📝 Quick Explanation
Java is a platform-independent, object-oriented language. We shift from functional (C) to Object-Oriented thinking: Class, Object, Abstraction, Encapsulation, Heritage, Polymorphism.

## 📌 Important Topics
- **OOP Pillars**: Encapsulation, Inheritance, Polymorphism, Abstraction.
- **Java Basics**: Bytecode, JVM, JRE, JDK.
- **History**: James Gosling, "Write Once, Run Anywhere".
- **Variables & Data Types**: Primitive vs Reference types.
- **Operators**: Similar to C.

## 🧠 Key Concepts
> **Platform Independent**: Java compiles to Bytecode (.class) which runs on any JVM.
> **Class**: Blueprint. **Object**: Instance.
`,

    "Object Oriented Programming Through Java_Unit_2": `# Unit 2: Inheritance & Packages

## 📝 Quick Explanation
Inheritance reuses code (Parent -> Child). Interfaces allow multiple inheritance behavior. Packages organize classes (like folders).

## 📌 Important Topics
- **Inheritance**: extends keyword. Types (Single, Multilevel, Hierarchical). No Multiple inheritance of classes.
- **super keyword**: Access parent members/constructor.
- **Abstract Classes**: partial implementation.
- **Interfaces**: \`implements\`. All methods public abstract by default.
- **Packages**: user-defined packages, import statement. Access specs (private, default, protected, public).

## 🧠 Key Concepts
> **Method Overriding**: Runtime Polymorphism (Same signature).
> **Interface**: 100% Abstract class (Pre-Java 8).
`,

    "Object Oriented Programming Through Java_Unit_3": `# Unit 3: Exception Handling & Multithreading

## 📝 Quick Explanation
Errors happen. Try-Catch allows graceful handling instead of crashing. Multithreading allows doing multiple things at once (like UI + downloading).

## 📌 Important Topics
- **Exceptions**: Try, Catch, Finally, Throw, Throws.
- **Hierarchy**: Throwable -> Error / Exception -> RuntimeException / Checked Exception.
- **Multithreading**: Thread class vs Runnable interface.
- **Lifecycle**: New, Runnable, Running, Blocked, Dead.
- **Synchronization**: Preventing data corruption.

## 🧠 Key Concepts
> **Checked Exception**: Compilation error if completely ignored (e.g., IOException).
> **Unchecked**: Runtime (e.g., NullPointerException).
> **finally**: Always executes.
`,

    "Object Oriented Programming Through Java_Unit_4": `# Unit 4: Files & Collections

## 📝 Quick Explanation
Reading files in Java using Streams. The Collection Framework provides ready-made data structures like ArrayList, HashSet, HashMap.

## 📌 Important Topics
- **I/O Streams**: Byte Streams (FileInputStream) vs Character Streams (FileReader).
- **Serialization**: Saving object state.
- **Collections**: List (ArrayList, LinkedList), Set (HashSet), Map (HashMap).
- **Generics**: Type safety (\`List<String>\`).

## 🧠 Key Concepts
> **Stream**: Flow of data.
> **ArrayList**: Dynamic array.
`,

    "Object Oriented Programming Through Java_Unit_5": `# Unit 5: AWT & Applets (or GUI/Swings)

## 📝 Quick Explanation
Building GUI apps. Note: AWT is old, Swing/FX is newer, but syllabus often covers AWT event handling (Listeners).

## 📌 Important Topics
- **AWT Components**: Button, Label, TextField.
- **Event Handling**: Event Sources, Listeners (ActionListener), Adapters.
- **Layout Managers**: FlowLayout, BorderLayout, GridLayout.

## 🧠 Key Concepts
> **Observer Pattern**: Basis of Event Handling.
`,

    // ==========================================
    // YEAR 2 SEM 2
    // ==========================================

    // --- DATABASE MANAGEMENT SYSTEMS (DBMS) ---
    "Database Management Systems (DBMS)_Unit_1": `# Unit 1: Introduction to DBMS

## 📝 Quick Explanation
Databases store data structurally. DBMS (like MySQL, Oracle) manages it. We learn ER Models (Diagrams) to design databases conceptually before building tables.

## 📌 Important Topics
- **File System vs DBMS**: Redundancy, Consistency, Security.
- **Levels of Abstraction**: Physical, Logical, View.
- **Data Models**: Relational, Hierarchical, Network.
- **ER Model**: Entity, Attribute, Relationship, Cardinality (1:1, 1:N).

## 🧠 Key Concepts
> **DBA**: Database Administrator.
> **Schema**: Logical structure. **Instance**: Actual data at a snapshot.
`,

    "Database Management Systems (DBMS)_Unit_2": `# Unit 2: Relational Model & Algebra

## 📝 Quick Explanation
The Relational Model (Tables) is the standard. Relational Algebra is the theoretical query language (Select, Project, Join operations).

## 📌 Important Topics
- **Relational Model**: Relation (Table), Tuple (Row), Attribute (Col).
- **Keys**: Primary, Candidate, Super, Foreign Key.
- **Integrity Constraints**: Entity (PK not null), Referential (FK match).
- **Relational Algebra**: Selection ($\sigma$), Projection ($\pi$), Cartesian Product ($\times$), Natural Join.

## 🧠 Key Concepts
> **Foreign Key**: Link between two tables.
`,

    "Database Management Systems (DBMS)_Unit_3": `# Unit 3: SQL & Normalization

## 📝 Quick Explanation
SQL is the language of databases. Normalization allows us to design tables to minimize redundancy and anomalies (Update/Delete errors).

## 📌 Important Topics
- **SQL Commands**: DDL (Create), DML (Insert/Update), DCL (Grant), TCL (Commit).
- **Aggregates**: Count, Sum, Group By, Having.
- **Joins**: Inner, Left, Right, Full.
- **Normalization**: 1NF (Atomic), 2NF (Partial Dep), 3NF (Transitive), BCNF.

## 🧠 Key Concepts
> **ACID**: Atomicity, Consistency, Isolation, Durability.
> **3NF**: "The key, the whole key, and nothing but the key".
`,

    "Database Management Systems (DBMS)_Unit_4": `# Unit 4: Transaction Management

## 📝 Quick Explanation
A transaction is a logical unit of work (e.g., Transfer money = Debit A + Credit B). Both must happen or neither. Concurrency control ensures multiple users don't break functionality.

## 📌 Important Topics
- **Transaction States**: Active, Partially Committed, Committed, Failed, Aborted.
- **Schedule**: Serial vs Concurrent.
- **Serializability**: Conflict Serializability.
- **Concurrency Control**: Locks (Shared/Exclusive), 2-Phase Locking (2PL).
- **Deadlocks**: Prevention, Detection (Wait-for graph).

## 🧠 Key Concepts
> **Atomicity**: All or Nothing.
> **Isolation**: Transactions valid as if run alone.
`,

    "Database Management Systems (DBMS)_Unit_5": `# Unit 5: Storage & Indexing

## 📝 Quick Explanation
How data is stored on disk (Magnetic disks, RAID). Indexing (like a book index) speeds up searching (B+ Trees).

## 📌 Important Topics
- **Physical Storage**: RAID levels (0, 1, 5).
- **File Organization**: Heap, Sequential, Hash.
- **Indexing**: Primary (Sparse/Dense), Secondary, Multi-level.
- **B+ Trees**: Balanced tree for indexing (Leaves linked).

## 🧠 Key Concepts
> **B+ Tree**: Standard for DB Indexing.
`,

    // --- OPERATING SYSTEMS (OS) ---
    "Operating Systems (OS)_Unit_1": `# Unit 1: OS Introduction

## 📝 Quick Explanation
The OS manages hardware-software interaction. We look at System Calls (API to kernel), OS structures (Monolithic vs Microkernel).

## 📌 Important Topics
- **OS Roles**: Resource allocator, Control program.
- **Types**: Batch, Time-sharing, Distributed, Real-time.
- **System Calls**: fork(), exec(), open(), read().
- **OS Structure**: Layered, Microkernel.

## 🧠 Key Concepts
> **Kernel**: Core of OS.
> **System Call**: User mode to Kernel mode switch.
`,

    "Operating Systems (OS)_Unit_2": `# Unit 2: Process Management

## 📝 Quick Explanation
A Process is a program in execution. The CPU Scheduler decides which process runs (FCFS, Round Robin). Threads are lightweight processes.

## 📌 Important Topics
- **Process State**: New, Ready, Run, Wait, Terminate. PCB.
- **Scheduling Algo**: FCFS, SJF (Shortest Job), Priority, Round Robin (Time quantum).
- **Threads**: User vs Kernel threads.
- **Inter-Process Communication (IPC)**: Shared memory, Message passing.

## 🧠 Key Concepts
> **Context Switch**: Saving state of old process and loading new one (Overhead).
> **Round Robin**: Best for time-sharing/responsiveness.
`,

    "Operating Systems (OS)_Unit_3": `# Unit 3: Synchronization & Deadlocks

## 📝 Quick Explanation
When processes share data (Critical Section), race conditions occur. Semaphores and Monitors solve this. Deadlocks happen when processes wait for each other forever.

## 📌 Important Topics
- **Critical Section Problem**: Mutual Exclusion, Progress, Bounded Waiting.
- **Toos**: Mutex, Semaphores (Binary/Counting).
- **Classic Problems**: Producer-Consumer, Dining Philosophers.
- **Deadlock**: 4 Conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait).
- **Handling**: Prevention, Avoidance (Banker's Algorithm), Detection.

## 🧠 Key Concepts
> **Semaphore**: A signal variable (Wait/Signal).
> **Banker's Algorithm**: Checks for Safe State.
`,

    "Operating Systems (OS)_Unit_4": `# Unit 4: Memory Management

## 📝 Quick Explanation
OS manages RAM. Paging divides memory into fixed blocks to avoid fragmentation. Virtual Memory allows running large programs on small RAM using Paging on demand.

## 📌 Important Topics
- **Contiguous Allocation**: Fragmentation (Internal/External).
- **Paging**: Frames (Physical) vs Pages (Logical). Page Table.
- **Segmentation**: Logical units (Function, Stack).
- **Virtual Memory**: Demand Paging, Page Fault.
- **Page Replacement**: FIFO, LRU (Least Recently Used), Optimal.

## 🧠 Key Concepts
> **Page Fault**: Data not in RAM -> Fetch from Disk.
> **Thrashing**: CPU busy swapping pages instead of executing.
`,

    "Operating Systems (OS)_Unit_5": `# Unit 5: File Systems & Protection

## 📝 Quick Explanation
Files are logical storage units. Directories organize them. Access Control Matrix deals with security (Who can read/write).

## 📌 Important Topics
- **File Concept**: Attributes, Operations.
- **Access Methods**: Sequential, Direct (Random).
- **Directory Structure**: Single, Two-level, Tree.
- **Allocation Methods**: Contiguous, Linked (FAT), Indexed (inode).
- **Disk Scheduling**: FCFS, SSTF, SCAN (Elevator).

## 🧠 Key Concepts
> **inode**: Data structure in Unix FS storing file metadata.
> **Scan Algo**: Head moves end-to-end like an elevator.
`,
};
