module.exports = {
    // ==========================================
    // YEAR 1 SEM 1 & 2
    // ==========================================

    // --- MATRICES AND CALCULUS ---
    "Matrices and Calculus_Unit_1": `# Unit 1: Theory of Matrices

## 📝 Quick Explanation
Matrix theory is fundamental to engineering mathematics, used in solving systems of linear equations, analyzing structures, and processing signals. This unit focuses on the properties of specific types of matrices, determining the **rank** (which tells us about the solution space), and methods to solve linear systems. The **Cayley-Hamilton Theorem** is a powerful tool to find inverses and powers of matrices without tedious calculations.

## 📌 Important Topics
- **Types of Matrices**: Real (Symmetric, Skew-Symmetric, Orthogonal) and Complex (Hermitian, Skew-Hermitian, Unitary).
- **Rank of a Matrix**: Echelon form and Normal form.
- **System of Linear Equations**: Consistency, Homogeneous vs Non-Homogeneous systems.
- **Cayley-Hamilton Theorem**: Statement, verification, and finding $A^{-1}$ and $A^n$.

## 🧠 Key Concepts & Formulas
> **Rank**: The number of non-zero rows in Echelon form.
> **Consistency**: If Rank(A) = Rank(A|B) = n, Unique Solution. If Rank(A) = Rank(A|B) < n, Infinite Solutions.
> **Orthogonal Matrix**: $A A^T = I$.
`,

    "Matrices and Calculus_Unit_2": `# Unit 2: Eigenvalues and Eigenvectors

## 📝 Quick Explanation
Eigenvalues and Eigenvectors are critical in vibration analysis, stability control, and facial recognition algorithms. They represent the "characteristic" values of a system. Diagonalization simplifies matrix operations by transforming a matrix into a diagonal form, making powers of matrices easy to compute.

## 📌 Important Topics
- **Eigenvalues & Eigenvectors**: Definition and properties.
- **Properties**: Sum of eigenvalues = Trace; Product = Determinant.
- **Cayley-Hamilton Applications**: Using characteristic equation.
- **Diagonalization**: $P^{-1}AP = D$.
- **Quadratic Forms**: Reducing quadratic form to canonical form by Orthogonal Transformation.

## 🧠 Key Concepts & Formulas
> **Characteristic Equation**: $|A - \\lambda I| = 0$.
> **Nature of Quadratic Form**: Determined by eigenvalues (All +ve = Positive Definite).
`,

    "Matrices and Calculus_Unit_3": `# Unit 3: Calculus

## 📝 Quick Explanation
This unit bridges single-variable calculus to multivariable calculus. Mean Value Theorems help in estimating functions. Partial differentiation is essential when a system depends on multiple variables (e.g., temperature depending on x, y, z, and time). Maxima and Minima helps in finding optimal points (peaks and valleys) in 3D surfaces.

## 📌 Important Topics
- **Mean Value Theorems**: Rolle's, Lagrange's, Cauchy's.
- **Partial Differentiation**: Euler's Theorem for homogeneous functions.
- **Jacobian**: Transformation of coordinates.
- **Maxima and Minima**: Functions of two variables, Lagrange's Method of Undetermined Multipliers.

## 🧠 Key Concepts & Formulas
> **Euler's Theorem**: $x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = nu$.
> **Jacobian**: $J = \\frac{\\partial(u,v)}{\\partial(x,y)}$.
`,

    "Matrices and Calculus_Unit_4": `# Unit 4: Multiple Integrals

## 📝 Quick Explanation
Integrals extend to 2D (Area) and 3D (Volume). Double integrals are used to find areas of bounded regions, while triple integrals calculate volumes. Changing the order of integration or switching to Polar/Cylindrical/Spherical coordinates often simplifies complex problems.

## 📌 Important Topics
- **Double Integrals**: Evaluation in Cartesian and Polar coordinates.
- **Change of Order of Integration**: Swapping dx and dy.
- **Change of Variables**: Cartesian to Polar ($dx dy = r dr d\\theta$).
- **Triple Integrals**: Finding volume.

## 🧠 Key Concepts & Formulas
> **Area**: $\\iint dA$.
> **Volume**: $\\iiint dV$.
`,

    "Matrices and Calculus_Unit_5": `# Unit 5: Vector Calculus

## 📝 Quick Explanation
Vector Calculus deals with vector fields. It is the language of electromagnetism and fluid dynamics. We study how fields change (Gradient used for normal vectors), how they flow out of a point (Divergence), and how they rotate (Curl). The integral theorems connect line, surface, and volume integrals.

## 📌 Important Topics
- **Gradient**: Normal vector to a surface ($\ abla \\phi$).
- **Divergence**: Flux density ($\ abla \\cdot F$).
- **Curl**: Rotation ($\ abla \\times F$).
- **Vector Integration**: Line, Surface, Volume integrals.
- **Integral Theorems**: Green's, Gauss Divergence, Stokes' Theorem.

## 🧠 Key Concepts & Formulas
> **Solenoidal**: $\ abla \\cdot F = 0$.
> **Irrotational**: $\ abla \\times F = 0$.
> **Green's Theorem**: Relates line integral to double integral in a plane.
`,

    // --- ENGINEERING CHEMISTRY ---
    "Engineering Chemistry_Unit_1": `# Unit 1: Atomic Structure and Chemical Bonding

## 📝 Quick Explanation
Understanding the microscopic structure of atoms and how they bond explains the properties of materials. Molecular Orbital Theory (MOT) provides a deeper understanding of bond order and magnetic properties compared to classical theories. Crystal Field Theory explains the colors and magnetism in coordination complexes.

## 📌 Important Topics
- **Molecular Orbital Theory**: LCAO, Bonding & Antibonding orbitals.
- **Energy Level Diagrams**: $N_2$, $O_2$, $F_2$, $CO$.
- **Crystal Field Theory (CFT)**: Splitting of d-orbitals in octahedral and tetrahedral complexes.
- **Band Theory**: Conductors, Semiconductors, Insulators.

## 🧠 Key Concepts & Formulas
> **Bond Order**: $\\frac{1}{2} (N_b - N_a)$.
> **Doping**: Adding impurities to increase conductivity (n-type, p-type).
`,

    "Engineering Chemistry_Unit_2": `# Unit 2: Chemical Thermodynamics and Thermochemistry

## 📝 Quick Explanation
Thermodynamics predicts whether a reaction will occur spontaneously. It deals with energy changes (Enthalpy) and disorder (Entropy). Free energy (Gibbs function) is the ultimate criterion for spontaneity.

## 📌 Important Topics
- **Laws of Thermodynamics**: First and Second laws.
- **Entropy**: Definition and physical significance.
- **Free Energy (G)**: Gibbs-Helmholtz equation.
- **Spontaneity**: Conditions ($\Delta G < 0$).
- **Thermochemistry**: Hess's Law.

## 🧠 Key Concepts & Formulas
> **Gibbs Free Energy**: $G = H - TS$.
> **Spontaneous**: $\Delta G$ is negative.
`,

    "Engineering Chemistry_Unit_3": `# Unit 3: Electrochemistry and Corrosion

## 📝 Quick Explanation
Electrochemistry powers our batteries and sensors. We study Nernst equation to find cell potentials. Corrosion is the degradation of metals; understanding its mechanism helps us prevent it (Galvanizing, Cathodic Protection).

## 📌 Important Topics
- **Electrochemistry**: Nernst Equation, Electrochemical series.
- **Batteries**: Primary (Lithium), Secondary (Lead-Acid, Li-ion), Fuel Cells ($H_2-O_2$).
- **Corrosion**: Dry vs Wet corrosion, Pilling-Bedworth rule.
- **Corrosion Control**: Sacrificial Anode, Impressed Current.

## 🧠 Key Concepts & Formulas
> **Nernst Eq**: $E = E^0 - \\frac{0.0591}{n} \\log Q$.
> **Rusting**: Formation of hydrated ferric oxide.
`,

    "Engineering Chemistry_Unit_4": `# Unit 4: Water Technology

## 📝 Quick Explanation
Hard water causes scaling in boilers and ruins pipes. This unit focuses on determining hardness (EDTA method) and softening methods (Zeolite, Ion-Exchange) to make water suitable for industrial and domestic use. Desalination turns sea water into drinking water.

## 📌 Important Topics
- **Hardness**: Temporary vs Permanent, EDTA titration.
- **Boiler Troubles**: Scale, Sludge, Priming, Foaming, Caustic Embrittlement.
- **Softening Methods**: Lime-Soda, Zeolite, Ion-Exchange (Demineralization).
- **Potable Water**: Desalination (Reverse Osmosis).

## 🧠 Key Concepts & Formulas
> **EDTA**: Ethylene Diamine Tetra Acetic acid (Complexometric titration).
> **Reverse Osmosis**: Applying pressure > osmotic pressure to filter solvent.
`,

    "Engineering Chemistry_Unit_5": `# Unit 5: Polymers and Materials Chemistry

## 📝 Quick Explanation
Polymers are everywhere (Plastics, Rubbers, Fibers). We learn polymerization mechanisms and properties of commercial polymers like PVC, Bakelite, and Nylon. Advanced materials like Lubricants and Nanomaterials are also introduced.

## 📌 Important Topics
- **Polymerization**: Addition vs Condensation, Free radical mechanism.
- **Plastics**: Thermoplastics vs Thermosetting.
- **Preparation & Uses**: PVC, Bakelite, Nylon-6,6, Teflon.
- **Lubricants**: Mechanism (Thick/Thin film), Viscosity Index, Flash/Fire point.
- **Nanomaterials**: Preparation (Sol-Gel), CNTs.

## 🧠 Key Concepts & Formulas
> **Vulcanization**: Heating rubber with sulfur to improve strength.
> **Viscosity Index**: Resistance to change in viscosity with temperature.
`,

    // --- PROGRAMMING FOR PROBLEM SOLVING (PPS) ---
    "Programming for Problem Solving_Unit_1": `# Unit 1: Introduction to Programming

## 📝 Quick Explanation
This unit lays the foundation of Computer Science. It covers computer architecture basics and introduces the C language. Understanding variables, data types, and operators is the first step to writing any code.

## 📌 Important Topics
- **Computer Anatomy**: CPU, Memory, I/O.
- **Algorithm & Flowchart**: Logic design tools.
- **C Basics**: Structure of a C program, #include.
- **Data Types**: int, float, char, double.
- **Operators**: Arithmetic, Relational, Logical, Bitwise, Ternary.
- **Type Conversion**: Implicit vs Explicit (Casting).

## 🧠 Key Concepts & Formulas
> **Bitwise Operators**: AND (&), OR (|), XOR (^), Left Shift (<<), Right Shift (>>).
> **Precedence**: Order in which operators are evaluated (BODMAS for C).
`,

    "Programming for Problem Solving_Unit_2": `# Unit 2: Control Structures

## 📝 Quick Explanation
Control structures allow programs to make decisions and repeat actions. Without them, code would just run line-by-line. We master \`if-else\` for logic and loops (\`for\`, \`while\`) for iteration.

## 📌 Important Topics
- **Conditional Branching**: Simple if, if-else, else-if ladder, nested if.
- **Switch Case**: Multi-way selection, break statement.
- **Loops**: while (Entry controlled), do-while (Exit controlled), for (Compact).
- **Jumps**: break, continue, goto.

## 🧠 Key Concepts & Formulas
> **Infinite Loop**: \`while(1)\` or \`for(;;)\`.
> **Switch**: Works only with integral types (int, char).
`,

    "Programming for Problem Solving_Unit_3": `# Unit 3: Arrays & Strings

## 📝 Quick Explanation
Arrays let us store multiple values of the same type (like a list of marks). Strings are just arrays of characters. Mastering these is crucial for processing data sets and text.

## 📌 Important Topics
- **1D Arrays**: Declaration, Initialization, Accessing elements.
- **2D Arrays**: Matrix operations (Addition, Multiplication).
- **Strings**: Null character \`\\0\`.
- **String Library (<string.h>)**:
    - \`strlen()\`: Length
    - \`strcpy()\`: Copy
    - \`strcat()\`: Concatenate (Append)
    - \`strcmp()\`: Comparison

## 🧠 Key Concepts & Formulas
> **Index**: Starts at 0. Last element is at \`size-1\`.
> **Matrix Mul**: Rows of A $\times$ Columns of B.
`,

    "Programming for Problem Solving_Unit_4": `# Unit 4: Pointers & User Defined Types

## 📝 Quick Explanation
Pointers are the most powerful feature of C, allowing direct memory manipulation. They are essential for dynamic memory, passing optimization, and data structures. Structs allow us to group related data (like Student Name + Roll No + Marks).

## 📌 Important Topics
- **Pointers**: Address operator (&), Indirection operator (*).
- **Pointer Arithmetic**: Incrementing moves to next data block.
- **Dynamic Memory Allocation (<stdlib.h>)**: malloc, calloc, realloc, free.
- **Structures**: \`struct\`, Dot operator (.), Arrow operator (->).
- **Union**: Shared memory space.

## 🧠 Key Concepts & Formulas
> **Call by Reference**: Passing address to function modifies actual arguments.
> **Memory Leak**: Forgetting to \`free()\` allocated memory.
`,

    "Programming for Problem Solving_Unit_5": `# Unit 5: File Handling & Recursion

## 📝 Quick Explanation
Files allow data to persist after the program ends. We learn how to read/write text and binary files. Recursion is a technique where a function calls itself, useful for problems like Factorial or Fibonacci.

## 📌 Important Topics
- **File Operations**: fopen, fclose.
- **File Modes**: "r" (Read), "w" (Write), "a" (Append).
- **I/O Functions**: fprintf/fscanf, fgetc/fputc, fgets/fputs.
- **Binary Files**: fread, fwrite.
- **Recursion**: Base case and Recursive step.
- **Searching/Sorting**: Linear Search, Binary Search, Bubble Sort, Selection Sort.

## 🧠 Key Concepts & Formulas
> **Base Case**: The condition where recursion stops to prevent stack overflow.
> **Binary Search**: Requires sorted array. Complexity $O(\\log n)$.
`,

    // --- APPLIED PHYSICS ---
    "Applied Physics_Unit_1": `# Unit 1: Quantum Mechanics

## 📝 Quick Explanation
Classical mechanics fails at the atomic scale. Quantum mechanics introduces the idea that particles behave like waves (duality). We verify this with the Photoelectric effect and Compton effect. Schrödinger's equation is the "F = ma" of the quantum world.

## 📌 Important Topics
- **Wave-Particle Duality**: de Broglie hypothesis ($\lambda = h/p$).
- **Heisenberg Uncertainty Principle**: Cannot measure position and momentum simultaneously precisely.
- **Schrödinger Wave Equation**: Time Independent and Dependent forms.
- **Particle in a 1D Box**: Quantization of energy levels.

## 🧠 Key Concepts & Formulas
> **Wave Function ($\psi$)**: Represents the state. $|\psi|^2$ is probability density.
> **Energy Levels**: $E_n = \\frac{n^2 h^2}{8mL^2}$.
`,

    "Applied Physics_Unit_2": `# Unit 2: Semiconductor Physics

## 📝 Quick Explanation
Semiconductors (Silicon, Germanium) are the heart of electronics. We learn how doping changes their properties (n-type vs p-type). The Hall Effect is a key experiment to identify charge carriers.

## 📌 Important Topics
- **Band Theory**: Valence Band, Conduction Band, Forbidden Gap.
- **Intrinsic**: Pure semiconductor (Structure, Fermi level).
- **Extrinsic**: Doped (n-type: Pentavalent, p-type: Trivalent).
- **Fermi Level**: Position in n-type (near CB) and p-type (near VB).
- **Hall Effect**: Determination of Hall coefficient and carrier concentration.
- **PN Junction**: Forward and Reverse bias characteristics.

## 🧠 Key Concepts & Formulas
> **Mass Action Law**: $np = n_i^2$.
> **Hall Voltage**: $V_H$ is proportional to magnetic field and current.
`,

    "Applied Physics_Unit_3": `# Unit 3: Optoelectronics & Fibers

## 📝 Quick Explanation
Lasers provide coherent light used in surgery and communication. Optical fibers transmit data at light speed using Total Internal Reflection (TIR), forming the backbone of the internet.

## 📌 Important Topics
- **Lasers**: absorption, spontaneous vs stimulated emission, population inversion.
- **Types of Lasers**: Ruby (Solid), He-Ne (Gas), Semiconductor.
- **Fiber Optics**: Principle (TIR), Acceptance Angle, Numerical Aperture (NA).
- **Types of Fibers**: Step index vs Graded index which reduces dispersion.
- **Losses**: Attenuation (Absorption, Scattering, Bending).

## 🧠 Key Concepts & Formulas
> **Population Inversion**: More atoms in excited state than ground state.
> **Numerical Aperture**: $NA = \\sin(\\theta_a) = \\sqrt{n_1^2 - n_2^2}$.
`,

    "Applied Physics_Unit_4": `# Unit 4: Magnetism & Dielectrics

## 📝 Quick Explanation
Magnetic materials are essential for motors and storage. Dielectrics are electrical insulators that can be polarized, used in capacitors. Ferromagnetism explains why iron is magnetic (Domain theory).

## 📌 Important Topics
- **Magnetism**: Dia, Para, Ferro materials.
- **Hysteresis Loop (B-H Curve)**: Retentivity, Coercivity (Soft vs Hard magnets).
- **Dielectrics**: Polar vs Non-polar molecules.
- **Polarization**: Electronic, Ionic, Orientation.
- **Internal Field**: Clausius-Mosotti relation.

## 🧠 Key Concepts & Formulas
> **Curie Temperature**: Temp above which Ferromagnetic becomes Paramagnetic.
> **Piezoelectricity**: Pressure generates voltage.
`,

    "Applied Physics_Unit_5": `# Unit 5: Electromagnetism

## 📝 Quick Explanation
Maxwell's equations unify electricity and magnetism, proving light is an EM wave. Gauss's Law relates charge to electric field, and Faraday's Law relates changing magnetic field to induced voltage.

## 📌 Important Topics
- **Gauss's Law**: Electrostatics and Magnetostatics.
- **Faraday's Law**: EMI.
- **Ampere's Circuital Law**: Modified by Maxwell (Displacement Current).
- **Maxwell's Equations**: 4 Fundamental equations (Integral & Differential forms).
- **EM Waves**: Transverse nature, Pointing Vector.

## 🧠 Key Concepts & Formulas
> **Displacement Current**: Arises from changing electric flux ($I_d = \\epsilon_0 d\\phi_E/dt$).
> **Speed of Light**: $c = \\frac{1}{\\sqrt{\\mu_0 \\epsilon_0}}$.
`,

    // --- BASIC ELECTRONIC ENGINEERING (BEE) ---
    "Basic Electronic Engineering_Unit_1": `# Unit 1: Diodes and Applications

## 📝 Quick Explanation
This unit introduces the PN junction diode, the simplest semiconductor device. We learn how it rectifies (converts AC to DC) and how Zener diodes regulate voltage. Clippers and Clampers modify waveforms.

## 📌 Important Topics
- **PN Junction**: V-I Characteristics, Forward/Reverse Bias.
- **Rectifiers**: Half Wave, Full Wave Center-Tap, Bridge Rectifier (Efficiency, Ripple Factor).
- **Filters**: C-filter (Capacitor) to smooth output.
- **Zener Diode**: Breakdown mechanism, Voltage Regulator circuit.
- **Clippers & Clampers**: Series/Parallel configurations.

## 🧠 Key Concepts & Formulas
> **Ripple Factor**: Measure of AC component in output. Bridge = 0.48.
> **PIV**: Peak Inverse Voltage (Max reverse voltage diode can withstand).
`,

    "Basic Electronic Engineering_Unit_2": `# Unit 2: Bipolar Junction Transistor (BJT)

## 📝 Quick Explanation
The Transistor (BJT) is the building block of modern electronics. It acts as an amplifier (current booster) or a switch. We study its three configurations (CB, CE, CC) and input/output characteristics.

## 📌 Important Topics
- **Construction**: NPN vs PNP. Emitter, Base, Collector functions.
- **Configurations**: Common Base (CB), Common Emitter (CE), Common Collector (CC).
- **Characteristics**: Input (Vbe vs Ib) and Output (Vce vs Ic).
- **Biasing**: DC Load line, Operating Point (Q-point).

## 🧠 Key Concepts & Formulas
> **Current Gain**: $\\beta = I_c / I_b$ (for CE). $\\alpha = I_c / I_e$ (for CB).
> **Operating Regions**: Active (Amplifier), Saturation (Switch ON), Cutoff (Switch OFF).
`,

    "Basic Electronic Engineering_Unit_3": `# Unit 3: Field Effect Transistor (FET)

## 📝 Quick Explanation
FETs are voltage-controlled devices (unlike BJTs which are current-controlled). They have high input impedance. MOSFETs are used in almost all digital ICs (Processors).

## 📌 Important Topics
- **JFET**: N-channel vs P-channel, Construction, Drain Characteristics.
- **MOSFET**: Depletion vs Enhancement modes.
- **Comparision**: BJT vs FET (BJT is bipolar, FET is unipolar).

## 🧠 Key Concepts & Formulas
> **Pinch-off Voltage**: Voltage where drain current becomes constant.
> **Input Impedance**: FET > BJT.
`,

    "Basic Electronic Engineering_Unit_4": `# Unit 4: Digital Electronics

## 📝 Quick Explanation
Digital electronics deals with 0s and 1s. We cover Number Systems (Binary, Hex) to understand how computers count. Logic Gates are the physical implementation of Boolean Algebra.

## 📌 Important Topics
- **Number Systems**: Binary, Octal, Hexadecimal conversions. 1's and 2's Complement.
- **Logic Gates**: AND, OR, NOT, NAND, NOR, XOR, XNOR.
- **Boolean Algebra**: Laws (Commutative, Associative), De Morgan's Theorems.
- **K-Map**: Karnaugh Map for minimizing boolean expressions (SOP and POS).
- **Combinational Circuits**: Half/Full Adder.

## 🧠 Key Concepts & Formulas
> **Universal Gates**: NAND and NOR (Can build any other gate using just these).
> **De Morgan**: $(A+B)' = A'B'$.
`,

    "Basic Electronic Engineering_Unit_5": `# Unit 5: Linear Integrated Circuits

## 📝 Quick Explanation
ICs pack entire circuits into a chip. Use Op-Amps (741) for math operations (add, subtract) and the 555 Timer for generating pulses/delays.

## 📌 Important Topics
- **Op-Amp (741)**: Ideal vs Practical characteristics.
- **Applications**: Inverting, Non-Inverting Amplifier, Voltage Follower, Summer.
- **555 Timer**: Pin diagram, Monostable (Timer) and Astable (Oscillator) Multivibrator modes.

## 🧠 Key Concepts & Formulas
> **Virtual Ground**: Voltage at inverting terminal matches non-inverting terminal.
> **Gain (Non-Inv)**: $1 + R_f/R_1$.
`,
};
