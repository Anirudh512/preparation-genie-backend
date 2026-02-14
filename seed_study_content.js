const mongoose = require('mongoose');
// Hardcoded URI as .env is missing or not loading immediately
const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';

// Mongoose Schema (Inline for standalone script)
const studyContentSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    unit: { type: String, required: true }, // "1", "2", etc.
    content: { type: String, required: true },
    lastUpdated: { type: Date, default: Date.now }
});

const StudyContent = mongoose.model('StudyContent', studyContentSchema);

// DATA FROM DART FILE
const studySummaries = {
    "Matrices and Calculus_Unit_1": `# Unit 1: Theory of Matrices

## 1.1 Types of Matrices
- **Symmetric**: A' = A
- **Skew-Symmetric**: A' = -A
- **Orthogonal**: A * A' = I
- **Hermitian**: A^theta = A

## 1.2 Rank of a Matrix
- The maximum number of linearly independent rows or columns.
- **Echelon Form**: Used to find rank.
- **Normal Form Service**: Reduce to [I r  0; 0  0].

## 1.3 System of Linear Equations
- **Consistent**: Has solution (Rank(A) = Rank(A|B)).
- **Inconsistent**: No solution (Rank(A) != Rank(A|B)).
- **Homogeneous System**: AX = 0 (Always consistent).
    - **Trivial Solution**: X = 0 (if |A| != 0).
    - **Non-Trivial**: Infinite solutions (if |A| = 0).

## 📝 Key Formulas
- **Cayley-Hamilton Theorem**: Every square matrix satisfies its own characteristic equation.
- **Inverse**: A^-1 = (1/|A|) * adj(A)
`,

    "Matrices and Calculus_Unit_2": `# Unit 2: Eigenvalues and Eigenvectors

## 2.1 Basics
- **Eigenvalues (λ)**: Roots of characteristic equation |A - λI| = 0.
- **Eigenvectors (X)**: Non-zero vector satisfying AX = λX.

## 2.2 Properties
- Sum of eigenvalues = Trace(A).
- Product of eigenvalues = Determinant(A).
- Eigenvalues of A and A' are same.

## 2.3 Diagonalization
- If A has 'n' independent eigenvectors, P^-1 * A * P = D (Diagonal Matrix).
- Powers of Matrix: A^k = P * D^k * P^-1.

## 📝 Key Methods
- **Cayley-Hamilton Application**: Find A^-1 and A^n.
- **Quadratic Forms**: Reduction to standard form using Orthogonal Transformation.
`,

    "Matrices and Calculus_Unit_3": `# Unit 3: Calculus

## 3.1 Mean Value Theorems
- **Rolle's Theorem**: If f(a)=f(b), there exists c in (a,b) where f'(c)=0.
- **Lagrange's Mean Value Theorem**: f'(c) = [f(b) - f(a)] / (b - a).
- **Cauchy's Mean Value Theorem**: Ratio of derivatives.

## 3.2 Multivariable Calculus
- **Partial Derivatives**: Derivative with respect to one variable keeping others constant.
- **Total Derivative**: dz = (∂z/∂x)dx + (∂z/∂y)dy.
- **Jacobian**: Determinant of partial derivatives matrix (J). J * J' = 1.

## 3.3 Maxima and Minima
- **Necessary Condition**: fx = 0, fy = 0 (Stationary Points).
- **Sufficient Condition**:
    - rt - s^2 > 0 and r < 0: **Maximum**.
    - rt - s^2 > 0 and r > 0: **Minimum**.
    - rt - s^2 < 0: **Saddle Point**.
`,

    "Matrices and Calculus_Unit_4": `# Unit 4: Multiple Integrals

## 4.1 Double Integrals
- Integration over a 2D region (Area).
- **Cartesian**: ∫∫ f(x,y) dx dy.
- **Polar**: ∫∫ f(r,θ) r dr dθ.

## 4.2 Change of Order
- Changing integration limits (dx dy to dy dx) often simplifies problems.

## 4.3 Triple Integrals
- Integration over a 3D region (Volume).
- **Applications**: Volume, Center of Mass.
`,

    "Matrices and Calculus_Unit_5": `# Unit 5: Vector Calculus

## 5.1 Gradient, Divergence, Curl
- **Gradient (∇φ)**: Scalar to Vector (Normal vector).
- **Divergence (∇.F)**: Vector to Scalar (Flux density). Solenoidal if ∇.F = 0.
- **Curl (∇×F)**: Vector to Vector (Rotation). Irrotational if ∇×F = 0.

## 5.2 Integral Theorems
- **Green's Theorem**: Relation between line integral and double integral in a plane.
- **Stokes' Theorem**: Line integral to surface integral (Curl).
- **Gauss Divergence Theorem**: Surface integral to volume integral (Divergence).

## 📝 Key Concepts
- **Scalar Potential**: If F is irrotational, F = ∇φ.
- **Work Done**: ∫ F . dr
`,

    "Programming for Problem Solving_Unit_1": `# Unit 1: Introduction to Programming

## 1.1 Computer Systems
- **Hardware**: CPU, Memory (RAM/ROM), I/O Devices.
- **Software**: System Software (OS), Application Software.
- **Algorithm**: Step-by-step logic.
- **Flowchart**: Graphical representation.

## 1.2 C Basics
- **Structure**: Header files, main(), declarations, statements.
- **Data Types**: int (2/4 bytes), float (4 bytes), char (1 byte), double (8 bytes).
- **Variables**: Named memory locations.
- **Constants**: Fixed values (e.g., const int MAX = 100;).

## 1.3 Operators
- **Arithmetic**: +, -, *, /, %
- **Relational**: ==, !=, >, <
- **Logical**: &&, ||, !
- **Bitwise**: &, |, ^, <<, >>

## 📝 Code Snippet
\`\`\`c
#include <stdio.h>
int main() {
    printf("Hello, World!");
    return 0;
}
\`\`\`
`,

    "Programming for Problem Solving_Unit_2": `# Unit 2: Control Structures

## 2.1 Decision Making
- **if-else**: Basic conditional.
- **switch-case**: Multi-way branching (better than nested if for equality checks).

## 2.2 Loops
- **while**: Entry controlled.
- **do-while**: Exit controlled (runs at least once).
- **for**: Compact loop (init; cond; inc/dec).

## 2.3 Jump Statements
- **break**: Exit loop/switch.
- **continue**: Skip current iteration.
- **goto**: Unconditional jump (avoid using).

## 📝 Example: Factorial
\`\`\`c
int fact = 1;
for(int i=1; i<=n; i++) {
    fact = fact * i;
}
\`\`\`
`,

    "Programming for Problem Solving_Unit_3": `# Unit 3: Arrays & Strings

## 3.1 Arrays
- Collection of same data type.
- **1D Array**: \`int arr[5];\`
- **2D Array**: \`int mat[3][3];\` (Matrix).
- Memory is contiguous.

## 3.2 Strings
- Array of characters ending with null \`\\0\`.
- **Functions** (\`<string.h>\`):
    - \`strlen(s)\`: Length.
    - \`strcpy(d, s)\`: Copy.
    - \`strcat(d, s)\`: Concatenate.
    - \`strcmp(s1, s2)\`: Compare.

## 📝 Example: String Copy
\`\`\`c
char str1[20] = "Hello";
char str2[20];
strcpy(str2, str1);
\`\`\`
`,

    "Programming for Problem Solving_Unit_4": `# Unit 4: Pointers & User Defined Types

## 4.1 Pointers
- Variable storing address of another variable.
- \`int *ptr = &a;\`
- **Dereferencing**: \`*ptr\` gives value.
- **Pointer Arithmetic**: ptr + 1 moves to next memory block.

## 4.2 Dynamic Memory Allocation
- \`<stdlib.h>\` functions:
    - **malloc()**: Allocates raw block.
    - **calloc()**: Allocates zero-initialized block.
    - **realloc()**: Resizes block.
    - **free()**: Deallocates memory.

## 4.3 Structures & Unions
- **Structure (struct)**: Collection of different data types. Size = Sum of members.
- **Union**: Similar to struct, but Size = Max member size (Shared memory).
- **Enumeration (enum)**: User-defined named integer constants.
`,

    "Programming for Problem Solving_Unit_5": `# Unit 5: File Handling

## 5.1 Basics
- **File Pointer**: \`FILE *fp;\`
- **Operations**:
    - \`fopen("file.txt", "mode")\`: Open. Modes: "r", "w", "a", "r+".
    - \`fclose(fp)\`: Close.

## 5.2 Read/Write Functions
- \`fprintf()\`, \`fscanf()\`: Formatted I/O.
- \`fputc()\`, \`fgetc()\`: Character I/O.
- \`fputs()\`, \`fgets()\`: String I/O.
- \`fwrite()\`, \`fread()\`: Binary I/O.

## 5.3 Command Line Arguments
- \`int main(int argc, char *argv[])\`
- Used to pass input when running the program.
`,

    "Applied Physics_Unit_1": `# Unit 1: Quantum Mechanics

## 1.1 Introduction
- **Classical Mechanics Failure**: Blackbody radiation, Photoelectric effect.
- **Wave-Particle Duality**: de Broglie hypothesis (λ = h/p).

## 1.2 Schrödinger Equation
- **Time Independent**: Describe standard wave function.
- **Physical Significance of ψ**: |ψ|² represents probability density.
- **Particle in a 1D Box**: Energy levels are quantized (En ∝ n²).

## 📝 Key Formulas
- **de Broglie Wavelength**: λ = h / mv
- **Energy (1D Box)**: E = (n²h²) / (8mL²)
`,

    "Applied Physics_Unit_2": `# Unit 2: Semiconductor Physics

## 2.1 Intrinsic Semiconductors
- Pure (Si, Ge). n = p (ni).
- **Fermi Level**: Exactly at the center of band gap.

## 2.2 Extrinsic Semiconductors
- **n-type**: Pentavalent doping. Fermi level shifts near Conduction Band.
- **p-type**: Trivalent doping. Fermi level shifts near Valence Band.

## 2.3 Hall Effect
- Generation of voltage perpendicular to current and magnetic field.
- **Uses**: Determine semi-conductor type (n or p), carrier concentration.

## 2.4 PN Junction
- Formation of depletion region.
- **Forward Bias**: Depletion width decreases, current flows.
- **Reverse Bias**: Depletion width increases, no current.
`,

    "Applied Physics_Unit_3": `# Unit 3: Optoelectronics & Fibers

## 3.1 Lasers
- **Principle**: Stimulated Emission.
- **Characteristics**: Coherent, Monochromatic, Directional.
- **Ruby Laser**: 3-level solid state.
- **He-Ne Laser**: 4-level gas laser.

## 3.2 Fiber Optics
- **Principle**: Total Internal Reflection (TIR).
- **Condition**: Angle of incidence > Critical angle (i > c).
- **Acceptance Angle**: Max angle for light entry.
- **Numerical Aperture (NA)**: Light gathering ability.
- **Types**: Step-index, Graded-index (GRIN).
- **Losses**: Attenuation, Dispersion.
`,

    "Applied Physics_Unit_4": `# Unit 4: Magnetism & Dielectrics

## 4.1 Magnetism
- **Dia**: Repelled by magnetic field.
- **Para**: Weakly attracted (Curie Law).
- **Ferro**: Strongly attracted (Hysteresis Loop).
- **Domain Theory**: Explains Ferromagnetism.

## 4.2 Dielectrics
- Insulators that can be polarized.
- **Electric Dipole Moment**: p = q * d.
- **Polarization (P)**: Dipole moment per unit volume.
- **Types**: Electronic, Ionic, Orientation.
- **Clausius-Mosotti Relation**: Relates dielectric constant to polarizability.
`,

    "Applied Physics_Unit_5": `# Unit 5: Electromagnetism

## 5.1 Maxwell's Equations
- **Consequence**: Light is an EM wave.
- **Gauss Law (E)**: ∇.D = ρ
- **Gauss Law (B)**: ∇.B = 0 (No monopoles)
- **Faraday's Law**: ∇×E = -∂B/∂t
- **Ampere-Maxwell Law**: ∇×H = J + ∂D/∂t (Displacement Current).
`,

    "Basic Electronic Engineering_Unit_1": `# Unit 1: Diodes

## 1.1 PN Junction Diode
- **V-I Characteristics**: Exponential rise in forward bias (after Knee Voltage ~0.7V for Si).
- **Ideal Diode**: Acts as short in FB, open in RB.

## 1.2 Applications
- **Rectifiers**: Convert AC to DC.
    - **Half Wave**: Efficiency 40.6%.
    - **Full Wave (Bridge)**: Efficiency 81.2%.
- **Clippers**: Remove part of waveform.
- **Clampers**: Shift DC level.

## 1.3 Zener Diode
- Heavily doped.
- Works in **Reverse Breakdown** region.
- Used as **Voltage Regulator**.
`,

    "Basic Electronic Engineering_Unit_2": `# Unit 2: Bipolar Junction Transistor (BJT)

## 2.1 Construction
- **Types**: NPN (Most common) and PNP.
- **Terminals**: Emitter (Heavy dope), Base (Light dope), Collector (Moderate dope/Large area).

## 2.2 Configurations
- **Common Base (CB)**: Voltage gain, Low current gain (alpha).
- **Common Emitter (CE)**: High power gain (beta).
- **Common Collector (CC)**: Buffer (High Rin, Low Rout).
- **Alpha vs Beta**: β = α / (1 - α).

## 2.3 Characteristics
- **Input**: Ib vs Vbe.
- **Output**: Ic vs Vce (Active, Saturation, Cutoff regions).
`,

    "Basic Electronic Engineering_Unit_3": `# Unit 3: Field Effect Transistor (FET)

## 3.1 JFET
- **Junction Field Effect Transistor**.
- Voltage Controlled Device.
- **N-channel vs P-channel**.
- **Operation**: Depletion width controls drain current.

## 3.2 MOSFET
- **Metal Oxide Semiconductor FET**.
- **Enhancement Mode**: Normally OFF (Needs Vgs > Vth).
- **Depletion Mode**: Normally ON.
- **CMOS**: Complementary MOSFET (Low power).
`,

    "Basic Electronic Engineering_Unit_4": `# Unit 4: Digital Electronics

## 4.1 Number Systems
- Binary (Base 2), Hexadecimal (Base 16), Octal (Base 8).
- **Conversions**: Methods to convert decimal to binary etc.

## 4.2 Logic Gates
- **Basic**: AND, OR, NOT.
- **Universal**: NAND, NOR.
- **Exclusive**: XOR, XNOR.

## 4.3 Boolean Algebra
- **De Morgan's Laws**:
    - (A + B)' = A' . B'
    - (A . B)' = A' + B'
`,

    "Basic Electronic Engineering_Unit_5": `# Unit 5: Integrated Circuits (ICs)

## 5.1 Op-Amp (Operational Amplifier)
- **Ideal Characteristics**: Infinite Gain, Infinite Rin, Zero Rout.
- **Inverting Amplifier**: Vo = -(Rf/R1)Vi.
- **Non-Inverting**: Vo = (1 + Rf/R1)Vi.

## 5.2 555 Timer
- Versatile IC for timing/oscillation.
- **Modes**: Monostable (One shot), Astable (Oscillator).
`
};

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected.");

        let count = 0;
        for (const [key, content] of Object.entries(studySummaries)) {
            // Key format: "Subject_Unit_X"
            const parts = key.split("_Unit_");
            if (parts.length < 2) continue;

            const subject = parts[0];
            const unit = parts[1];

            console.log(`Seeding: ${subject} - Unit ${unit}`);

            await StudyContent.findOneAndUpdate(
                { subject, unit },
                { content, lastUpdated: new Date() },
                { upsert: true, new: true }
            );
            count++;
        }

        console.log(`Successfully seeded ${count} units.`);

    } catch (e) {
        console.error("Seeding failed:", e);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected.");
    }
}

seed();
