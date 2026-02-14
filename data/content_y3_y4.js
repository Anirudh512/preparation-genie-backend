module.exports = {
    // ==========================================
    // YEAR 3
    // ==========================================

    // --- COMPUTER NETWORKS ---
    "Computer Networks_Unit_1": `# Unit 1: Introduction to Networks

## 📝 Quick Explanation
Computer networks connect devices to share resources. We rely on the OSI and TCP/IP reference models to standardize communication layers (Physical -> Application).

## 📌 Important Topics
- **Network Topology**: Bus, Star, Ring, Mesh.
- **OSI Model**: 7 Layers (Physical, Data Link, Network, Transport, Session, Presentation, Application).
- **TCP/IP Model**: 4 Layers.
- **Transmission Media**: Guided (Twisted pair, Coax, Fiber) vs Unguided (Wireless).

## 🧠 Key Concepts
> **Encapsulation**: Adding headers as data moves down layers.
> **Protocol**: Set of rules (Syntax, Semantics, Timing).
`,

    "Computer Networks_Unit_2": `# Unit 2: Data Link Layer

## 📝 Quick Explanation
Responsible for node-to-node delivery. It handles error detection (CRC) and flow control (Sliding Window). MAC addresses live here.

## 📌 Important Topics
- **Framing**: Bit stuffing, Byte stuffing.
- **Error Control**: CRC (Cyclic Redundancy Check), Hamming Code.
- **Flow Control**: Stop and Wait, Sliding Window (Go-Back-N, Selective Repeat).
- **MAC Sublayer**: ALOHA, CSMA/CD (Ethernet).

## 🧠 Key Concepts
> **CSMA/CD**: Listen before talking. If collision, stop and wait random time.
> **MAC Address**: Physical address (48-bit).
`,

    "Computer Networks_Unit_3": `# Unit 3: Network Layer

## 📝 Quick Explanation
Responsible for source-to-destination delivery (Routing). IP Addresses live here. Routers decide the best path for packets.

## 📌 Important Topics
- **IP Addressing**: IPv4 (Class A, B, C, CIDR), IPv6.
- **Subnetting**: Dividing networks.
- **Routing Algorithms**: Distance Vector (RIP), Link State (OSPF).
- **ICMP**: Ping, Error reporting.
- **ARP/RARP**: IP to MAC mapping.

## 🧠 Key Concepts
> **Packet**: Unit of data at Network Layer.
> **TTL**: Time To Live (prevents loops).
`,

    "Computer Networks_Unit_4": `# Unit 4: Transport Layer

## 📝 Quick Explanation
End-to-End delivery. TCP ensures reliability (connection-oriented), while UDP is fast but unreliable (connectionless, used in streaming).

## 📌 Important Topics
- **TCP**: 3-Way Handshake, Flow Control, Congestion Control (Slow Start).
- **UDP**: Datagrams, Low overhead.
- **Port Numbers**: Addressing processes (HTTP 80, DNS 53).

## 🧠 Key Concepts
> **Reliability**: TCP guarantees order and delivery. UDP does not.
> **Socket**: IP Address + Port Number.
`,

    "Computer Networks_Unit_5": `# Unit 5: Application Layer

## 📝 Quick Explanation
The layer user interacts with. HTTP (Web), SMTP (Email), DNS (Domain Names) are the key protocols.

## 📌 Important Topics
- **DNS**: Recursive vs Iterative resolution.
- **HTTP**: Request/Response, Codes (200, 404), Statelessness.
- **Email**: SMTP (Push), POP3/IMAP (Pull).
- **FTP**: File Transfer.

## 🧠 Key Concepts
> **DNS**: Phonebook of the internet (URL -> IP).
`,

    // --- DESIGN AND ANALYSIS OF ALGORITHMS (DAA) ---
    "Design And Analysis Of Algorithms_Unit_1": `# Unit 1: Algorithm Basics

## 📝 Quick Explanation
DAA is about solving problems efficiently. We analyze performance (Time/Space) and verify correctness.

## 📌 Important Topics
- **Asymptotic Notation**: Big-O, Omega, Theta.
- **Recurrence Relations**: Master Theorem, Substitution Method.
- **Disjoint Sets**: Union-Find operations.

## 🧠 Key Concepts
> **Big-O**: Upper bound (Worst case).
`,

    "Design And Analysis Of Algorithms_Unit_2": `# Unit 2: Divide and Conquer

## 📝 Quick Explanation
Break problem into subproblems, solve them, and combine. Used in efficient sorting.

## 📌 Important Topics
- **Merge Sort**: $O(n \\log n)$.
- **Quick Sort**: Partitioning logic.
- **Binary Search**: Divide search space.
- **Strassen's Matrix Multiplication**: Faster than standard $O(n^3)$.

## 🧠 Key Concepts
> **Recursion**: Core of Divide and Conquer.
`,

    "Design And Analysis Of Algorithms_Unit_3": `# Unit 3: Greedy Method

## 📝 Quick Explanation
Make the locally optimal choice at each step hoping for global optimum. Works for some problems (MST) but not all (Knapsack 0/1).

## 📌 Important Topics
- **Knapsack Problem**: Fractional (Greedy works).
- **Job Sequencing**: With deadlines.
- **MST**: Prim's and Kruskal's.
- **Shortest Path**: Dijkstra's Algorithm.

## 🧠 Key Concepts
> **Greedy Choice Property**: Local optimal -> Global optimal.
`,

    "Design And Analysis Of Algorithms_Unit_4": `# Unit 4: Dynamic Programming

## 📝 Quick Explanation
Solve complex problems by breaking them into overlapping subproblems and storing results (Memoization). Used where Greedy fails.

## 📌 Important Topics
- **0/1 Knapsack**: Tabulation method.
- **All Pairs Shortest Path**: Floyd-Warshall.
- **Matrix Chain Multiplication**: Order of multiplication optimization.
- **LCS**: Longest Common Subsequence.
- **TSP**: Traveling Salesperson (Exponential but optimized).

## 🧠 Key Concepts
> **Memoization**: Caching results of sub-calls.
> **Optimality Principle**: Sub-solutions must be optimal.
`,

    "Design And Analysis Of Algorithms_Unit_5": `# Unit 5: Backtracking & Branch and Bound

## 📝 Quick Explanation
Systematic search of solution space. Backtracking abandons invalid paths (N-Queens). Branch and Bound uses estimation to prune search tree (TSP).

## 📌 Important Topics
- **Backtracking**: N-Queens, Sum of Subsets, Graph Coloring.
- **Branch and Bound**: TSP, 0/1 Knapsack (optimization).
- **NP-Hard/Complete**: P vs NP concepts.

## 🧠 Key Concepts
> **Pruning**: Cutting off search branches that cannot yield solution.
`,

    // --- SOFTWARE ENGINEERING (SE) ---
    "Software Engineering (SE)_Unit_1": `# Unit 1: Process Models

## 📝 Quick Explanation
Systematic approach to dev. Waterfall is linear; Agile is iterative.

## 📌 Important Topics
- **SDLC**: Requirements, Design, Code, Test, Maintain.
- **Models**: Waterfall, Incremental, Spiral (Risk driven).
- **Agile**: Scrum, Flexibility.

## 🧠 Key Concepts
> **Spiral Model**: Best for large, risky projects.
`,

    "Software Engineering (SE)_Unit_2": `# Unit 2: Requirements

## 📝 Quick Explanation
What to build? SRS (Software Requirement Specification) is the bible.

## 📌 Important Topics
- **Functional vs Non-Functional**: Features vs Speed/Security.
- **SRS Document**: Structure.
- **UML**: Use Case diagrams.

## 🧠 Key Concepts
> **SRS**: Must be consistent and complete.
`,

    "Software Engineering (SE)_Unit_3": `# Unit 3: Design

## 📝 Quick Explanation
How to build? Architecture and Component design.

## 📌 Important Topics
- **Cohesion vs Coupling**: High Cohesion, Low Coupling (Goal).
- **Design Patterns**: MVC basics.
- **UML**: Class diagrams, Sequence diagrams.

## 🧠 Key Concepts
> **Coupling**: Dependency between modules (Bad if high).
`,

    "Software Engineering (SE)_Unit_4": `# Unit 4: Testing

## 📝 Quick Explanation
Verifying it works. White box (Code visible) vs Black box (Input/Output).

## 📌 Important Topics
- **Testing Levels**: Unit, Integration, System, Acceptance.
- **Black Box**: Equivalence Partitioning, BVA.
- **White Box**: Path testing, Cyclomatic Complexity.

## 🧠 Key Concepts
> **Alpha/Beta**: Internal vs External User testing.
`,

    "Software Engineering (SE)_Unit_5": `# Unit 5: Quality & Maintenance

## 📝 Quick Explanation
Keeping software alive. CMMI levels measure maturity.

## 📌 Important Topics
- **Risk Management**: RMMM.
- **Quality Assurance (SQA)**: Reviews.
- **CMMI**: 5 Levels (Initial to Optimizing).
- **Maintenance**: Corrective, Adaptive, Perfective.

## 🧠 Key Concepts
> **Regression Testing**: Testing after changes to ensure no new bugs.
`,

    // --- ARTIFICIAL INTELLIGENCE (AI) ---
    "Artificial Intelligence_Unit_1": `# Unit 1: Introduction to AI

## 📝 Quick Explanation
AI is the study of agents that perceive and act. Turing Test defines intelligence capability.

## 📌 Important Topics
- **AI Definition**: Thinking vs Acting (Humanly vs Rationally).
- **Turing Test**: Can machine fool human?
- **Agents**: Sensors, Actuators, Environment (PEAS).
- **Types of Agents**: Reflex, Goal-based, Utility-based.

## 🧠 Key Concepts
> **Rational Agent**: Maximizes performance measure.
`,

    "Artificial Intelligence_Unit_2": `# Unit 2: Search Strategies

## 📝 Quick Explanation
Problem solving as search in state space. BFS/DFS (Blind) vs A* (Heuristic).

## 📌 Important Topics
- **Uninformed Search**: BFS, DFS, UCS (Uniform Cost).
- **Informed Search**: Greedy Best First, A* Search.
- **Heuristic Function (h)**: Estimated cost to goal.
- **Adversarial Search**: Minimax (Games like Chess), Alpha-Beta Pruning.

## 🧠 Key Concepts
> **A***: $f(n) = g(n) + h(n)$. Complete and Optimal if h is admissible.
`,

    "Artificial Intelligence_Unit_3": `# Unit 3: Knowledge Representation

## 📝 Quick Explanation
AI needs knowledge (Logic). Propositional and First Order Logic (FOL) model the world.

## 📌 Important Topics
- **Propositional Logic**: Boolean logic, Inference rules (Modus Ponens).
- **First Order Logic (FOL)**: Quantifiers ($\forall, \exists$), Predicates.
- **Resolution**: Proof by contradiction.

## 🧠 Key Concepts
> **Modus Ponens**: If P implies Q, and P is true, then Q is true.
`,

    "Artificial Intelligence_Unit_4": `# Unit 4: Probabalisitc Reasoning

## 📝 Quick Explanation
Handling uncertainty. Bayes Theorem is the foundation. Bayesian Networks model dependencies.

## 📌 Important Topics
- **Probability Basics**: Prior, Posterior.
- **Bayes Theorem**: $P(A|B) = P(B|A)P(A) / P(B)$.
- **Bayesian Networks**: DAG representing dependencies.

## 🧠 Key Concepts
> **Naive Bayes**: Assumes features are independent.
`,

    "Artificial Intelligence_Unit_5": `# Unit 5: Learning

## 📝 Quick Explanation
Introduction to Machine Learning concepts within AI.

## 📌 Important Topics
- **Forms of Learning**: Supervised, Unsupervised, Reinforcement.
- **Decision Trees**: Entropy, Information Gain.
- **Neural Networks**: Perceptron basics.

## 🧠 Key Concepts
> **Overfitting**: Model memorizes noise instead of pattern.
`,

    // --- MACHINE LEARNING (ML) ---
    "Machine Learning_Unit_1": `# Unit 1: Introduction to ML

## 📝 Quick Explanation
ML = Algorithms that improve with experience. Well-Posed Learning Problem (T, P, E).

## 📌 Important Topics
- **Types**: Supervised (Labeled), Unsupervised (Unlabeled), RL (Reward).
- **Concept Learning**: Find hypothesis that fits data.
- **Find-S Algorithm**: Most specific hypothesis.

## 🧠 Key Concepts
> **Features**: Input variables.
> **Labels**: Target output.
`,

    "Machine Learning_Unit_2": `# Unit 2: Decision Trees & ANN

## 📝 Quick Explanation
Trees make decisions based on splitting data. ANN mimics the brain.

## 📌 Important Topics
- **ID3 Algorithm**: Uses Information Gain.
- **Entropy**: Measure of impurity.
- **Artificial Neural Networks**: Perceptron, Backpropagation, Gradient Descent.
- **Activation Functions**: Sigmoid, ReLU.

## 🧠 Key Concepts
> **Backpropagation**: How ANNs learn by updating weights backward.
`,

    "Machine Learning_Unit_3": `# Unit 3: Bayesian Learning

## 📝 Quick Explanation
Probabilistic approach. MAP (Maximum A Posteriori) hypothesis.

## 📌 Important Topics
- **Bayes Theorem**: Application in classification.
- **Naive Bayes Classifier**: Fast, efficient for text (Spam).
- **Bayesian Belief Networks**: Graphical models.
- **EM Algorithm**: Expectation-Maximization.

## 🧠 Key Concepts
> **MAP**: Hypothesis most probable given data.
`,

    "Machine Learning_Unit_4": `# Unit 4: Instance Based Learning

## 📝 Quick Explanation
Lazy learning. Store training data and compare new instance at runtime.

## 📌 Important Topics
- **k-Nearest Neighbors (k-NN)**: Classification by majority vote of neighbors.
- **Distance Metrics**: Euclidean, Manhattan.
- **Locally Weighted Regression**.

## 🧠 Key Concepts
> **Lazy Learner**: No training phase, slow inference.
`,

    "Machine Learning_Unit_5": `# Unit 5: Genetic Algorithms & RL

## 📝 Quick Explanation
Evolutionary computing and learning by trial/error.

## 📌 Important Topics
- **Genetic Algorithms**: Selection, Crossover, Mutation. Survival of fittest.
- **Reinforcement Learning**: Agent, State, Action, Reward.
- **Q-Learning**: Value based RL.

## 🧠 Key Concepts
> **Exploration vs Exploitation**: Try new things vs do what worked.
`,

    // ==========================================
    // YEAR 4 (Brief Coverage)
    // ==========================================

    // --- PREDICTIVE ANALYTICS ---
    "Predictive Analytics_Unit_1": `# Unit 1: Introduction

## 📝 Quick Explanation
Predictive Analytics uses data to predict future events. Uses stats and ML.

## 📌 Important Topics
- **Process**: Define, Data Collection, Cleaning, Modeling, Deployment.
- **Exploratory Data Analysis (EDA)**: Visualization, Summary stats.
`,

    "Predictive Analytics_Unit_2": `# Unit 2: Linear Regression

## 📝 Quick Explanation
Predicting continuous values (like Price).

## 📌 Important Topics
- **Simple Linear Regression**: $y = mx + c$.
- **OLS**: Ordinary Least Squares (Minimizing error).
- **R-squared**: Goodness of fit.
`,

    "Predictive Analytics_Unit_3": `# Unit 3: Logistic Regression

## 📝 Quick Explanation
Predicting categories (Yes/No).

## 📌 Important Topics
- **Sigmoid Function**: Sqashes output to 0-1 probability.
- **Odds Ratio**: Probability of success/failure.
- **Confusion Matrix**: Accuracy, Precision, Recall.
`,

    "Predictive Analytics_Unit_4": `# Unit 4: Time Series

## 📝 Quick Explanation
Data indexed by time (Stock prices).

## 📌 Important Topics
- **Components**: Trend, Seasonality, Noise.
- **Models**: AR, MA, ARIMA (Auto-Regressive Integrated Moving Average).
- **Stationarity**: Constant mean/variance.
`,

    "Predictive Analytics_Unit_5": `# Unit 5: Trees & Ensembles

## 📝 Quick Explanation
Advanced prediction models.

## 📌 Important Topics
- **Random Forest**: Bagging (Bootstrap Aggregation).
- **Gradient Boosting**: XGBoost basics.
- **Clustering**: K-Means (Unsupervised).
`,
};
