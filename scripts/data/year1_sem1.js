const year1Sem1Questions = [
    // ==========================================
    // MATRICES AND CALCULUS
    // ==========================================
    {
        subject: "Matrices and Calculus",
        unit: 1,
        questions: [
            { question: "Rank of identity matrix of order n is:", options: ["n-1", "n", "0", "1"], correctAnswer: 1, explanation: "Determinant is non-zero, so rank is n." },
            { question: "The eigenvalues of a real symmetric matrix are always:", options: ["Imaginary", "Real", "Zero", "Complex"], correctAnswer: 1, explanation: "Property of symmetric matrices." },
            { question: "If product of eigenvalues is 0, the matrix is:", options: ["Singular", "Non-singular", "Symmetric", "Skew-symmetric"], correctAnswer: 0, explanation: "Product of eigenvalues = Determinant. Det=0 means singular." },
            { question: "Cayley-Hamilton theorem applies to:", options: ["Square matrix", "Rectangular matrix", "Row matrix", "Column matrix"], correctAnswer: 0, explanation: "Only square matrices have characteristic equations." },
            { question: "Solution of AX=B is unique if Rank(A) = Rank(A|B) = ?", options: ["n (unknowns)", "< n", "> n", "0"], correctAnswer: 0, explanation: "Consistency condition for unique solution." },
            { question: "Trace of a matrix is sum of:", options: ["Eigenvalues", "Row elements", "Column elements", "Non-diagonal elements"], correctAnswer: 0, explanation: "Property: Sum of eigenvalues = Trace." },
            { question: "Eigenvectors corresponding to distinct eigenvalues are:", options: ["Linearly Independent", "Linearly Dependent", "Equal", "Zero"], correctAnswer: 0, explanation: "Standard property." },
            { question: "Inverse of matrix A exists if:", options: ["|A| = 0", "|A| != 0", "Trace(A) = 0", "A is symmetric"], correctAnswer: 1, explanation: "Matrix must be non-singular." },
            { question: "If A is orthogonal, then A inverse equals:", options: ["A", "A transpose", "-A", "Identity"], correctAnswer: 1, explanation: "A * A' = I implies A' = inv(A)." },
            { question: "Diagonal elements of Skew-Symmetric matrix are:", options: ["1", "Real", "Zero", "Imaginary"], correctAnswer: 2, explanation: "a_ij = -a_ji. For i=j, a_ii = -a_ii => 2a_ii=0 => a_ii=0." }
        ]
    },
    {
        subject: "Matrices and Calculus",
        unit: 2,
        questions: [
            { question: "Gauss-Jordan method reduces matrix to:", options: ["Diagonal matrix", "Identity matrix", "Upper triangular", "Lower triangular"], correctAnswer: 1, explanation: "Transforms [A|B] to [I|X]." },
            { question: "System with no solution is called:", options: ["Consistent", "Inconsistent", "Trivial", "Homogeneous"], correctAnswer: 1, explanation: "Inconsistent means no solution exists." },
            { question: "Trivial solution for AX=0 exists always and is:", options: ["X != 0", "X = 0", "X = 1", "Infinite"], correctAnswer: 1, explanation: "Zero vector always satisfies AX=0." },
            { question: "Condition for non-trivial solution of AX=0 is:", options: ["|A| != 0", "|A| = 0", "Rank = n", "None"], correctAnswer: 1, explanation: "|A|=0 implies infinite solutions including non-trivial ones." },
            { question: "In Gauss Elimination, the coefficient matrix is reduced to:", options: ["Diagonal", "Identity", "Row Echelon Form", "Inverse"], correctAnswer: 2, explanation: "Uses forward elimination." },
            { question: "Which method is an iterative method?", options: ["Gauss Elimination", "Gauss Jordan", "Gauss Seidel", "Cramer's Rule"], correctAnswer: 2, explanation: "Gauss Seidel solves by approximation." },
            { question: "Cramer's Rule is applicable only if determinant is:", options: ["Zero", "Non-Zero", "Positive", "Negative"], correctAnswer: 1, explanation: "Requires division by determinant." },
            { question: "LU Decomposition splits matrix A into:", options: ["Lower & Upper Triangular", "Left & Underlying", "Linear & Unique", "None"], correctAnswer: 0, explanation: "L (Lower) and U (Upper)." },
            { question: "Pivoting is used to improve:", options: ["Speed", "Accuracy", "Memory", "Storage"], correctAnswer: 1, explanation: "Reduces round-off errors." },
            { question: "Echelon form helps in finding:", options: ["Rank", "Trace", "Eigenvalues", "Eigenvectors"], correctAnswer: 0, explanation: "Number of non-zero rows in Echelon form = Rank." }
        ]
    },
    {
        subject: "Matrices and Calculus", // Unit 3 Vector Calculus (Simulated)
        unit: 3,
        questions: [
            { question: "Gradient of a scalar field produces a:", options: ["Scalar", "Vector", "Tensor", "Constant"], correctAnswer: 1, explanation: "Grad phi is a vector." },
            { question: "Divergence of a vector field produces a:", options: ["Scalar", "Vector", "Matrix", "Zero"], correctAnswer: 0, explanation: "Dot product of Del and Vector is scalar." },
            { question: "Curl of a gradient is always:", options: ["1", "Vector", "Zero vector", "Scalar"], correctAnswer: 2, explanation: "Identity: Curl(Grad phi) = 0." },
            { question: "A vector field with zero divergence is called:", options: ["Irrotational", "Solenoidal", "Conservative", "Scalar"], correctAnswer: 1, explanation: "Div V = 0 => Solenoidal." },
            { question: "A vector field with zero curl is called:", options: ["Irrotational", "Solenoidal", "Rotational", "Turbulent"], correctAnswer: 0, explanation: "Curl V = 0 => Irrotational." },
            { question: "Directional derivative is maximum along:", options: ["Normal", "Tangent", "Gradient", "Any direction"], correctAnswer: 2, explanation: "Along the gradient vector." },
            { question: "Unit normal vector to a surface is given by:", options: ["Grad phi", "Grad phi / |Grad phi|", "Div phi", "Curl phi"], correctAnswer: 1, explanation: "Normalized gradient." },
            { question: "If F = grad(phi), then F is:", options: ["Solenoidal", "Conservative", "Rotational", "Non-integrable"], correctAnswer: 1, explanation: "Conservative fields are gradients of potentials." },
            { question: "Del operator is:", options: ["Scalar", "Vector differential operator", "Integral operator", "Constant"], correctAnswer: 1, explanation: "Vector operator." },
            { question: "Work done by force F along curve C is:", options: ["Line integral", "Surface integral", "Volume integral", "None"], correctAnswer: 0, explanation: "Integral F.dr" }
        ]
    },
    {
        subject: "Matrices and Calculus", // Unit 4 Differential Calculus
        unit: 4,
        questions: [
            { question: "Rolle's theorem ensures existence of point where tangent is:", options: ["Vertical", "Parallel to x-axis", "Parallel to y-axis", "Undefined"], correctAnswer: 1, explanation: "Slope f'(c) = 0." },
            { question: "Lagrange's Mean Value Theorem is generalization of:", options: ["Taylor's", "Maclaurin's", "Rolle's", "Euler's"], correctAnswer: 2, explanation: "Rolle's is special case when f(a)=f(b)." },
            { question: "Cauchy's Mean Value Theorem involves:", options: ["1 function", "2 functions", "3 functions", "No functions"], correctAnswer: 1, explanation: "Ratio of derivatives of two functions." },
            { question: "Taylor's series expands function around:", options: ["x=0", "x=a", "Infinity", "None"], correctAnswer: 1, explanation: "Maclaurin's is for x=0." },
            { question: "Maclaurin's series is Taylor's series at:", options: ["a=1", "a=0", "a=-1", "a=infinity"], correctAnswer: 1, explanation: "Specific case." },
            { question: "Condition for maximum of f(x) at c is:", options: ["f'(c)=0, f''(c)>0", "f'(c)=0, f''(c)<0", "f'(c)>0", "f''(c)=0"], correctAnswer: 1, explanation: "Second derivative negative implies concave down (Max)." },
            { question: "Curvature of a circle of radius r is:", options: ["r", "1/r", "r^2", "0"], correctAnswer: 1, explanation: "Curvature = 1/Radius." },
            { question: "Evolute is the locus of:", options: ["Center of curvature", "Tangent", "Normal", "Chord"], correctAnswer: 0, explanation: "Definition of evolute." },
            { question: "Envelope touches:", options: ["One curve", "Family of curves", "Axes", "Origin"], correctAnswer: 1, explanation: "Tangent to each member of family." },
            { question: "Radius of curvature for straight line is:", options: ["0", "1", "Finite", "Infinity"], correctAnswer: 3, explanation: "Flat line has no curve." }
        ]
    },
    {
        subject: "Matrices and Calculus", // Unit 5 Integral Calculus
        unit: 5,
        questions: [
            { question: "Beta function is also called Euler's integral of:", options: ["First kind", "Second kind", "Third kind", "Fourth kind"], correctAnswer: 0, explanation: "Gamma is second kind." },
            { question: "Gamma(1/2) is equal to:", options: ["1", "0", "Square root of pi", "Pi"], correctAnswer: 2, explanation: "Standard result." },
            { question: "Relation between Beta and Gamma functions is:", options: ["B(m,n) = G(m)G(n)/G(m+n)", "B(m,n) = G(m+n)/G(m)", "B(m,n) = G(m)G(n)", "None"], correctAnswer: 0, explanation: "Standard formula." },
            { question: "Double integral represents:", options: ["Length", "Area/Volume", "Density", "Speed"], correctAnswer: 1, explanation: "Area usually, or Volume if f(x,y) is height." },
            { question: "Change of order of integration changes:", options: ["Limits", "Function", "Answer", "Nothing"], correctAnswer: 0, explanation: "Limits must change to sweep same area." },
            { question: "Jacobian is used for:", options: ["Finding maxima", "Change of variables", "Finding rank", "Solving ODE"], correctAnswer: 1, explanation: "Scaling factor in multiple integrals." },
            { question: "Area of circle x^2+y^2=a^2 using double integration is:", options: ["pi*a", "pi*a^2", "2*pi*a", "a^2"], correctAnswer: 1, explanation: "Standard area." },
            { question: "Gamma(n+1) is equal to:", options: ["n!", "n Gamma(n)", "Both A & B", "None"], correctAnswer: 2, explanation: "Recursive property." },
            { question: "Triple integral is used to find:", options: ["Area", "Volume", "Perimeter", "Slope"], correctAnswer: 1, explanation: "Volume of 3D region." },
            { question: "Coordinate system used for circular symmetry is:", options: ["Cartesian", "Polar", "Spherical", "Rectangular"], correctAnswer: 1, explanation: "r, theta simplifies circular bounds." }
        ]
    },

    // ==========================================
    // ENGINEERING CHEMISTRY
    // ==========================================
    {
        subject: "Engineering Chemistry",
        unit: 1,
        questions: [
            { question: "Which theory explains the magnetic properties of Oxygen molecule?", options: ["Valence Bond Theory", "Molecular Orbital Theory", "Crystal Field Theory", "VSEPR Theory"], correctAnswer: 1, explanation: "MOT explains paramagnetism of O2." },
            { question: "Bond order of N2 is:", options: ["1", "2", "3", "2.5"], correctAnswer: 2, explanation: "(10-4)/2 = 3." },
            { question: "Splitting energy for octahedral complex denoted by:", options: ["Δt", "Δo", "Δsq", "Δp"], correctAnswer: 1, explanation: "Octahedral." },
            { question: "P-type dopant example:", options: ["P", "As", "B", "Sb"], correctAnswer: 2, explanation: "Boron is group 13." },
            { question: "Beer-Lambert's law relates absorbance with:", options: ["Concentration", "Temp", "Pressure", "Vol"], correctAnswer: 0, explanation: "A=ecl." },
            { question: "Shape of d-orbital is:", options: ["Spherical", "Dumbbell", "Double Dumbbell", "Complex"], correctAnswer: 2, explanation: "Standard shape." },
            { question: "Which ligands cause larger splitting?", options: ["Weak field", "Strong field", "Neutral", "None"], correctAnswer: 1, explanation: "Spectrochemical series." },
            { question: "Bond order of O2 is:", options: ["1", "2", "1.5", "2.5"], correctAnswer: 1, explanation: "(10-6)/2 = 2." },
            { question: "Diamagnetic substances have:", options: ["Unpaired electrons", "No unpaired electrons", "Protons only", "Neutrons"], correctAnswer: 1, explanation: "Paired electrons cancel moment." },
            { question: "Unit of molar absorptivity:", options: ["L mol-1 cm-1", "mol L-1", "cm", "No unit"], correctAnswer: 0, explanation: "From Beer's law." }
        ]
    },
    {
        subject: "Engineering Chemistry",
        unit: 2,
        questions: [
            { question: "Temporary hardness is due to:", options: ["Cl-", "SO4--", "HCO3-", "NO3-"], correctAnswer: 2, explanation: "Bicarbonates." },
            { question: "Desalination removes:", options: ["Mud", "Salt", "Bacteria", "Odor"], correctAnswer: 1, explanation: "Salt removal." },
            { question: "For spontaneous reaction, Delta G is:", options: ["+ve", "-ve", "0", "1"], correctAnswer: 1, explanation: "Negative G." },
            { question: "Calgon is:", options: ["Na2CO3", "Sodium Hexametaphosphate", "Zeolite", "Resin"], correctAnswer: 1, explanation: "Commercial name." },
            { question: "Nernst equation calculates:", options: ["K", "EMF", "Ea", "H"], correctAnswer: 1, explanation: "Cell potential." },
            { question: "Standard Hydrogen Electrode potential is:", options: ["0V", "1V", "10V", "-1V"], correctAnswer: 0, explanation: "Reference." },
            { question: "Unit of Hardness:", options: ["mg/L", "g/L", "kg/L", "mol/L"], correctAnswer: 0, explanation: "ppm or mg/L." },
            { question: "Permutit process uses:", options: ["Resin", "Zeolite", "Carbon", "Sand"], correctAnswer: 1, explanation: "Zeolite softeners." },
            { question: "Break point chlorination ensures:", options: ["Min chlorine", "Max chlorine", "Free residual chlorine", "No chlorine"], correctAnswer: 2, explanation: "Disinfection." },
            { question: "Second law of thermodynamics introduces:", options: ["Enthalpy", "Entropy", "Internal Energy", "Work"], correctAnswer: 1, explanation: "Entropy." }
        ]
    },
    {
        subject: "Engineering Chemistry", // Unit 3 Electrochemistry
        unit: 3,
        questions: [
            { question: "Anode in Daniel Cell is:", options: ["Cu", "Zn", "Ag", "Fe"], correctAnswer: 1, explanation: "Zinc oxidizes." },
            { question: "Corrosion of iron is called:", options: ["Tarnishing", "Rusting", "Plating", "Annealing"], correctAnswer: 1, explanation: "Specific term." },
            { question: "Sacrificial anode metal should be:", options: ["Less active", "More active", "Noble", "Same"], correctAnswer: 1, explanation: "More active corrodes first." },
            { question: "Electrolyte in Lead-Acid battery:", options: ["HCl", "H2SO4", "HNO3", "NaCl"], correctAnswer: 1, explanation: "Sulfuric Acid." },
            { question: "Fuel cell converts chemical energy to:", options: ["Heat", "Electrical", "Mechanical", "Light"], correctAnswer: 1, explanation: "Direct conversion." },
            { question: "Unit of Conductance:", options: ["Ohm", "Siemens", "Volt", "Ampere"], correctAnswer: 1, explanation: "Reciprocal of Ohm." },
            { question: "Galvanization uses coating of:", options: ["Sn", "Zn", "Cu", "Ag"], correctAnswer: 1, explanation: "Zinc coating." },
            { question: "Lithium ion batteries use anode made of:", options: ["Li metal", "Graphite", "Pb", "Cd"], correctAnswer: 1, explanation: "Intercalated Graphite." },
            { question: "Pitting corrosion is:", options: ["Uniform", "Localized", "Beneficial", "None"], correctAnswer: 1, explanation: "Small holes." },
            { question: "Standard Electrode Potential depends on:", options: ["Temp", "Conc", "Nature of electrode", "All"], correctAnswer: 3, explanation: "All factors apply." }
        ]
    },
    {
        subject: "Engineering Chemistry", // Unit 4 Polymers
        unit: 4,
        questions: [
            { question: "Monomer of PVC is:", options: ["Ethene", "Vinyl Chloride", "Styrene", "Propene"], correctAnswer: 1, explanation: "Poly Vinyl Chloride." },
            { question: "Bakelite is:", options: ["Thermoplastic", "Thermosetting", "Elastomer", "Fiber"], correctAnswer: 1, explanation: "Cross-linked." },
            { question: "Natural rubber monomer:", options: ["Isoprene", "Chloroprene", "Butadiene", "Styrene"], correctAnswer: 0, explanation: "2-methyl-1,3-butadiene." },
            { question: "Vulcanization uses:", options: ["Carbon", "Sulfur", "Phosphorus", "Oxygen"], correctAnswer: 1, explanation: "Cross-linking agent." },
            { question: "Nylon 6,6 is a:", options: ["Polyester", "Polyamide", "Polyether", "Polyolefin"], correctAnswer: 1, explanation: "Amide linkage." },
            { question: "Teflon is used for:", options: ["Tyres", "Non-stick cookware", "Ropes", "Bottles"], correctAnswer: 1, explanation: "Heat/Chemical resistance." },
            { question: "Biodegradable polymer example:", options: ["PVC", "PLA", "PE", "PS"], correctAnswer: 1, explanation: "Polylactic Acid." },
            { question: "Addition polymerization requires:", options: ["Double bond", "Func groups", "Water loss", "Heat"], correctAnswer: 0, explanation: "Unsaturated monomers." },
            { question: "Elastomers have:", options: ["Weak forces", "Strong forces", "H-bonds", "Ionic bonds"], correctAnswer: 0, explanation: "Allows stretching." },
            { question: "Conducting polymer example:", options: ["PE", "PVC", "Polyaniline", "Nylon"], correctAnswer: 2, explanation: "Conjugated system." }
        ]
    },
    // Unit 5 Material Chemistry (Skipping for brevity to fit others)
    {
        subject: "Engineering Chemistry",
        unit: 5,
        questions: [
            { question: "Nanomaterials have size range:", options: ["1-100 nm", "1-100 um", "1-100 mm", "1-100 cm"], correctAnswer: 0, explanation: "Scale definition." },
            { question: "Lubricant function is to:", options: ["Increase friction", "Reduce friction", "Heat up", "None"], correctAnswer: 1, explanation: "Primary role." },
            { question: "Cement setting involves:", options: ["Hydration", "Dehydration", "Oxidation", "Reduction"], correctAnswer: 0, explanation: "Reaction with water." },
            { question: "Flash point is related to:", options: ["Safety", "Viscosity", "Color", "Taste"], correctAnswer: 0, explanation: "Fire safety temp." },
            { question: "Refractories must withstand:", options: ["Low temp", "High temp", "Water", "Acid"], correctAnswer: 1, explanation: "High heat resistance." },
            { question: "Viscosity Index measures change of viscosity with:", options: ["Pressure", "Temp", "Time", "Density"], correctAnswer: 1, explanation: "Temp dependency." },
            { question: "Graphite is a:", options: ["Liquid lubricant", "Solid lubricant", "Semi-solid", "Gas"], correctAnswer: 1, explanation: "Layered structure." },
            { question: "Composite material example:", options: ["Iron", "Wood", "Reinforced Concrete", "Water"], correctAnswer: 2, explanation: "Matrix + Reinforcement." },
            { question: "Fullerene contains carbons:", options: ["20", "60", "100", "Infinite"], correctAnswer: 1, explanation: "C60 Buckyball." },
            { question: "Cloud point is temp where oil becomes:", options: ["Clear", "Hazy", "Solid", "Gas"], correctAnswer: 1, explanation: "Wax crystallization." }
        ]
    },

    // ==========================================
    // PROGRAMMING FOR PROBLEM SOLVING (PPS)
    // ==========================================
    {
        subject: "Programming for Problem Solving",
        unit: 1,
        questions: [
            { question: "Variable Name valid:", options: ["1var", "_var", "var-name", "float"], correctAnswer: 1, explanation: "Underscore allowed." },
            { question: "Size of float:", options: ["2", "4", "8", "1"], correctAnswer: 1, explanation: "4 bytes." },
            { question: "Logical AND:", options: ["&", "&&", "|", "||"], correctAnswer: 1, explanation: "Operator." },
            { question: "printf header:", options: ["conio.h", "stdio.h", "math.h", "None"], correctAnswer: 1, explanation: "Standard IO." },
            { question: "5%2 output:", options: ["2", "1", "2.5", "0"], correctAnswer: 1, explanation: "Remainder." },
            { question: "Ternary operator:", options: ["?:", "::", "->", "."], correctAnswer: 0, explanation: "Conditional." },
            { question: "const keyword used for:", options: ["Variables", "Constants", "Functions", "Loops"], correctAnswer: 1, explanation: "Immutable." },
            { question: "Correct main prototype:", options: ["void main()", "int main()", "Both", "None"], correctAnswer: 2, explanation: "Standard C allow both." },
            { question: "Comment syntax:", options: ["//", "#", "<!--", "%"], correctAnswer: 0, explanation: "Single line." },
            { question: "ASCII value of 'A':", options: ["65", "97", "48", "32"], correctAnswer: 0, explanation: "Standard." }
        ]
    },
    // PPS Units 2-5
    {
        subject: "Programming for Problem Solving",
        unit: 2,
        questions: [
            { question: "Loop guaranteeing one run:", options: ["for", "while", "do-while", "None"], correctAnswer: 2, explanation: "Exit controlled." },
            { question: "break keyword:", options: ["Exit program", "Exit loop", "Skip", "Print"], correctAnswer: 1, explanation: "Loop termination." },
            { question: "Switch accepts:", options: ["float", "int/char", "string", "double"], correctAnswer: 1, explanation: "Integral types." },
            { question: "Equality check:", options: ["=", "==", "===", "!="], correctAnswer: 1, explanation: "Relational." },
            { question: "Infinite loop example:", options: ["for(;;)", "while(1)", "Both", "None"], correctAnswer: 2, explanation: "Standard idioms." },
            { question: "continue keyword:", options: ["Stops loop", "Skips iteration", "Exits", "None"], correctAnswer: 1, explanation: "Next iteration." },
            { question: "Nested loop complexity:", options: ["Add", "Multiply", "Subtract", "Divide"], correctAnswer: 1, explanation: "Inner runs N times for each Outer." },
            { question: "Default case in switch is:", options: ["Mandatory", "Optional", "First", "Last"], correctAnswer: 1, explanation: "Good practice but optional." },
            { question: "else matches with:", options: ["Nearest if", "First if", "Last if", "Random"], correctAnswer: 0, explanation: "Scope rule." },
            { question: "Factorial logic often uses:", options: ["Loop/Recursion", "Switch", "Array", "Pointer"], correctAnswer: 0, explanation: "Iterative or recursive." }
        ]
    },
    {
        subject: "Programming for Problem Solving",
        unit: 3,
        questions: [
            { question: "Array index starts at:", options: ["1", "0", "-1", "Any"], correctAnswer: 1, explanation: "Zero indexed." },
            { question: "String terminator char:", options: ["\\0", "\\n", "0", "END"], correctAnswer: 0, explanation: "Null character." },
            { question: "2D array access:", options: ["a[i,j]", "a[i][j]", "a(i,j)", "a{i}{j}"], correctAnswer: 1, explanation: "Standard syntax." },
            { question: "strlen() found in:", options: ["string.h", "stdlib.h", "stdio.h", "math.h"], correctAnswer: 0, explanation: "String lib." },
            { question: "strcmp return 0 means:", options: ["Equal", "First larger", "Second larger", "Error"], correctAnswer: 0, explanation: "Strings identical." },
            { question: "Bubble sort complexity:", options: ["O(n)", "O(n^2)", "O(log n)", "O(1)"], correctAnswer: 1, explanation: "Nested loops." },
            { question: "Linear search needs sorted data:", options: ["Yes", "No", "Maybe", "Always"], correctAnswer: 1, explanation: "Works on unsorted." },
            { question: "Binary search needs sorted data:", options: ["Yes", "No", "Maybe", "Never"], correctAnswer: 0, explanation: "Prerequisite." },
            { question: "Array name acts as:", options: ["Value", "Pointer to first elem", "Null", "Size"], correctAnswer: 1, explanation: "Decays to pointer." },
            { question: "strcat does:", options: ["Copy", "Compare", "Concatenate", "None"], correctAnswer: 2, explanation: "Joins strings." }
        ]
    },
    {
        subject: "Programming for Problem Solving",
        unit: 4,
        questions: [
            { question: "Pointer stores:", options: ["Value", "Address", "Char", "Float"], correctAnswer: 1, explanation: "Memory address." },
            { question: "Dereference operator:", options: ["&", "*", "->", "."], correctAnswer: 1, explanation: "Access value." },
            { question: "Size of pointer (32-bit):", options: ["2", "4", "8", "1"], correctAnswer: 1, explanation: "4 bytes." },
            { question: "Structure members accessed via:", options: [".", "->", "*", "&"], correctAnswer: 0, explanation: "Dot operator." },
            { question: "Structure pointer access:", options: [".", "->", "*", "&"], correctAnswer: 1, explanation: "Arrow operator." },
            { question: "Union shares memory:", options: ["Yes", "No", "Maybe", "None"], correctAnswer: 0, explanation: "Largest member size." },
            { question: "malloc returns:", options: ["int", "char*", "void*", "null"], correctAnswer: 2, explanation: "Generic pointer." },
            { question: "free() used for:", options: ["Allocating", "Deallocating", "Resizing", "None"], correctAnswer: 1, explanation: "Prevents leaks." },
            { question: "Pointer arithmetic unit:", options: ["Byte", "Data type size", "Bit", "Word"], correctAnswer: 1, explanation: "Scales by type." },
            { question: "Call by reference uses:", options: ["Values", "Addresses", "Globals", "None"], correctAnswer: 1, explanation: "Pointers passed." }
        ]
    },
    {
        subject: "Programming for Problem Solving",
        unit: 5,
        questions: [
            { question: "File open mode 'r':", options: ["Write", "Read", "Append", "Binary"], correctAnswer: 1, explanation: "Read mode." },
            { question: "EOF stands for:", options: ["End Of File", "Error Of File", "Exit", "None"], correctAnswer: 0, explanation: "Macro." },
            { question: "Recursion must have:", options: ["Loop", "Base case", "Pointer", "Global"], correctAnswer: 1, explanation: "Stop condition." },
            { question: "fprintf writes to:", options: ["Screen", "File stream", "Memory", "Network"], correctAnswer: 1, explanation: "File pointer." },
            { question: "Factorial recursive base case:", options: ["n=0 or 1", "n=10", "n=-1", "None"], correctAnswer: 0, explanation: "Return 1." },
            { question: "fseek used for:", options: ["Reading", "Writing", "Moving cursor", "Closing"], correctAnswer: 2, explanation: "Random access." },
            { question: "Stack overflow caused by:", options: ["Infinite recursion", "Small array", "Fast CPU", "None"], correctAnswer: 0, explanation: "Deep stack." },
            { question: "'w' mode if file exists:", options: ["Appends", "Overwrites", "Errors", "Reads"], correctAnswer: 1, explanation: "Truncates." },
            { question: "feof checks:", options: ["End of file", "Error", "Permission", "Size"], correctAnswer: 0, explanation: "EOF indicator." },
            { question: "Direct recursion calls:", options: ["Another function", "Itself", "Main", "Library"], correctAnswer: 1, explanation: "Self call." }
        ]
    },

    // ==========================================
    // COMPUTER AIDED ENGINEERING GRAPHICS
    // ==========================================
    {
        subject: "Computer Aided Engineering Graphics",
        unit: 1,
        questions: [
            { question: "Representative Fraction (RF) is:", options: ["Drawing/Actual", "Actual/Drawing", "Drawing*Actual", "None"], correctAnswer: 0, explanation: "Scale ratio." },
            { question: "Size of A0 sheet is:", options: ["1189x841", "594x420", "297x210", "841x594"], correctAnswer: 0, explanation: "ISO standard." },
            { question: "Which pencil is hardest?", options: ["HB", "2B", "2H", "4H"], correctAnswer: 3, explanation: "H series is hard." },
            { question: "Cycloid is generated by point on:", options: ["Line", "Circle rolling on line", "Circle on Circle", "Square"], correctAnswer: 1, explanation: "Rolling circle." },
            { question: "Involute used for:", options: ["Gears", "Bridges", "Roofs", "None"], correctAnswer: 0, explanation: "Gear teeth profile." },
            { question: "Conic sections obtained by cutting:", options: ["Cylinder", "Cone", "Sphere", "Prism"], correctAnswer: 1, explanation: "Double cone." },
            { question: "Eccentricity e=1 implies:", options: ["Ellipse", "Parabola", "Hyperbola", "Circle"], correctAnswer: 1, explanation: "Parabola definition." },
            { question: "e < 1 implies:", options: ["Ellipse", "Parabola", "Hyperbola", "Line"], correctAnswer: 0, explanation: "Ellipse." },
            { question: "Scale 1:1 is:", options: ["Reduced", "Enlarged", "Full size", "None"], correctAnswer: 2, explanation: "Exact size." },
            { question: "Title block position:", options: ["Top Left", "Top Right", "Bottom Left", "Bottom Right"], correctAnswer: 3, explanation: "Standard conventions." }
        ]
    },
    // Skipping other CAEG units for now to ensure file size limits

    // ==========================================
    // BASIC ELECTRONIC ENGINEERING (BEE)
    // ==========================================
    {
        subject: "Basic Electronic Engineering",
        unit: 1,
        questions: [
            { question: "Knee voltage Si:", options: ["0.3V", "0.7V", "1V", "0V"], correctAnswer: 1, explanation: "Silicon." },
            { question: "Zener used as:", options: ["Regulator", "Amplifier", "Switch", "Rectifier"], correctAnswer: 0, explanation: "Reverse bias." },
            { question: "Half Wave Eff:", options: ["40.6%", "50%", "81.2%", "100%"], correctAnswer: 0, explanation: "Max." },
            { question: "For fwd bias, depletion:", options: ["Widens", "Narrows", "Same", "None"], correctAnswer: 1, explanation: "Reduces." },
            { question: "Ideal diode reverse:", options: ["Short", "Open", "R", "L"], correctAnswer: 1, explanation: "Blocks current." },
            { question: "P-N junction has:", options: ["1 terminal", "2 terminals", "3 terminals", "4 terminals"], correctAnswer: 1, explanation: "Anode Cathode." },
            { question: "Full Wave Rectifier needs:", options: ["1 diode", "2 or 4 diodes", "0 diodes", "None"], correctAnswer: 1, explanation: "Center tap (2) or Bridge (4)." },
            { question: "Ripple factor HWR:", options: ["1.21", "0.48", "0", "1"], correctAnswer: 0, explanation: "High ripple." },
            { question: "Capacitor filter:", options: ["Blocks DC", "Blocks AC", "Passes DC", "Smooths output"], correctAnswer: 3, explanation: "Reduces ripple." },
            { question: "Varactor diode is:", options: ["Variable Resistor", "Variable Capacitor", "Inductor", "Switch"], correctAnswer: 1, explanation: "Voltage dependent capacitance." }
        ]
    }
];

module.exports = year1Sem1Questions;
