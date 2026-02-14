const mongoose = require('mongoose');
const Test = require('../models/Test');

const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';

const year1Tests = [
    // ==========================================
    // ENGINEERING CHEMISTRY
    // ==========================================
    {
        subject: "Engineering Chemistry",
        unit: 1,
        questions: [
            {
                question: "Which theory explains the magnetic properties of Oxygen molecule?",
                options: ["Valence Bond Theory", "Molecular Orbital Theory", "Crystal Field Theory", "VSEPR Theory"],
                correctAnswer: 1,
                explanation: "MOT explains paramagnetism of O2 due to unpaired electrons in antibonding orbitals."
            },
            {
                question: "The bond order of N2 molecule is:",
                options: ["1", "2", "3", "2.5"],
                correctAnswer: 2,
                explanation: "N2 has 10 bonding and 4 antibonding electrons. BO = (10-4)/2 = 3."
            },
            {
                question: "In Crystal Field Theory, the splitting energy for octahedral complex is denoted by:",
                options: ["Δt", "Δo", "Δsq", "Δp"],
                correctAnswer: 1,
                explanation: "Δo represents Octahedral splitting energy."
            },
            {
                question: "Which of the following is a p-type semiconductor dopant?",
                options: ["Phosphorus", "Arsenic", "Boron", "Antimony"],
                correctAnswer: 2,
                explanation: "Boron is a Group 13 element (Trivalent), creating holes."
            },
            {
                question: "Beer-Lambert's law relates absorbance with:",
                options: ["Concentration", "Temperature", "Pressure", "Volume"],
                correctAnswer: 0,
                explanation: "A = εcl, where c is concentration."
            },
            {
                question: "The bond order of O2 molecule is:",
                options: ["1", "1.5", "2", "2.5"],
                correctAnswer: 2,
                explanation: "O2 has 10 bonding and 6 antibonding electrons. BO = (10-6)/2 = 2."
            },
            {
                question: "Which molecule is diamagnetic according to MOT?",
                options: ["O2", "N2", "B2", "NO"],
                correctAnswer: 1,
                explanation: "N2 has all electrons paired."
            },
            {
                question: "The geometry of [Co(NH3)6]3+ is:",
                options: ["Tetrahedral", "Square Planar", "Octahedral", "Trigonal Bipyramidal"],
                correctAnswer: 2,
                explanation: "Coordination number 6 implies octahedral geometry."
            },
            {
                question: "Doping Silicon with Phosphorus results in:",
                options: ["n-type semiconductor", "p-type semiconductor", "Insulator", "Superconductor"],
                correctAnswer: 0,
                explanation: "Phosphorus is pentavalent, adding electrons (n-type)."
            },
            {
                question: "Which transition involves absorption of UV-Vis radiation?",
                options: ["Vibrational", "Rotational", "Electronic", "Nuclear"],
                correctAnswer: 2,
                explanation: "UV-Vis radiation causes electronic transitions."
            }
        ]
    },
    {
        subject: "Engineering Chemistry",
        unit: 2,
        questions: [
            {
                question: "Temporary hardness of water is caused by:",
                options: ["Chlorides", "Sulfates", "Bicarbonates", "Nitrates"],
                correctAnswer: 2,
                explanation: "Bicarbonates of Ca and Mg cause temporary hardness."
            },
            {
                question: "The process of removing salt from sea water is called:",
                options: ["Filtration", "Desalination", "Sedimentation", "Coagulation"],
                correctAnswer: 1,
                explanation: "Desalination (e.g., Reverse Osmosis) removes salts."
            },
            {
                question: "For a spontaneous reaction, ΔG must be:",
                options: ["Positive", "Negative", "Zero", "Infinity"],
                correctAnswer: 1,
                explanation: "Gibbs free energy change (ΔG) is negative for spontaneous processes."
            },
            {
                question: "Calgon conditioning involves addition of:",
                options: ["Sodium Carbonate", "Sodium Hexametaphosphate", "Sodium Zeolite", "Sodium Chloride"],
                correctAnswer: 1,
                explanation: "Calgon is Sodium Hexametaphosphate."
            },
            {
                question: "Nernst equation is used to calculate:",
                options: ["Rate constant", "Cell Potential", "Activation Energy", "Enthalpy"],
                correctAnswer: 1,
                explanation: "It relates cell potential to concentration."
            },
            {
                question: "Which of the following causes permanent hardness?",
                options: ["Mg(HCO3)2", "Ca(HCO3)2", "CaCl2", "Na2CO3"],
                correctAnswer: 2,
                explanation: "Chlorides and sulfates of Ca/Mg cause permanent hardness."
            },
            {
                question: "The unit of hardness is:",
                options: ["mg/L", "ppm", "Degree Clarke", "All of the above"],
                correctAnswer: 3,
                explanation: "All are valid units for expressing hardness."
            },
            {
                question: "Break-point chlorination is related to:",
                options: ["Removal of ammonia", "Killing pathogens", "Residual chlorine", "All of these"],
                correctAnswer: 3,
                explanation: "It ensures complete oxidation of ammonia and pathogens."
            },
            {
                question: "The entropy of a perfect crystal at absolute zero is:",
                options: ["Zero", "Infinite", "Unity", "Undefined"],
                correctAnswer: 0,
                explanation: "Third Law of Thermodynamics."
            },
            {
                question: "Corrosion of iron is known as:",
                options: ["Tarnishing", "Rusting", "Rancidity", "Fading"],
                correctAnswer: 1,
                explanation: "Rusting is the specific term for iron corrosion."
            }
        ]
    },

    // ==========================================
    // MATRICES AND CALCULUS
    // ==========================================
    {
        subject: "Matrices and Calculus",
        unit: 1,
        questions: [
            {
                question: "The rank of a Identity matrix of order 3 is:",
                options: ["0", "1", "2", "3"],
                correctAnswer: 3,
                explanation: "Determinant is non-zero (1), so rank is 3."
            },
            {
                question: "If A is a symmetric matrix, then A' is equal to:",
                options: ["A", "-A", "I", "0"],
                correctAnswer: 0,
                explanation: "Definition of Symmetric Matrix."
            },
            {
                question: "A system AX=B is consistent if:",
                options: ["Rank(A) != Rank(A|B)", "Rank(A) = Rank(A|B)", "|A| = 0", "Rank(A) < Rank(A|B)"],
                correctAnswer: 1,
                explanation: "Rouche-Capelli Theorem."
            },
            {
                question: "Inverse of a matrix exists only if it is:",
                options: ["Singular", "Non-Singular", "Symmetric", "Skew-Symmetric"],
                correctAnswer: 1,
                explanation: "Determinant must not be zero."
            },
            {
                question: "Cayley-Hamilton theorem states that a square matrix satisfies its own:",
                options: ["Transpose", "Inverse", "Characteristic Equation", "Adjoint"],
                correctAnswer: 2,
                explanation: "Statement of the theorem."
            }
        ]
    },

    // ==========================================
    // APPLIED PHYSICS
    // ==========================================
    {
        subject: "Applied Physics",
        unit: 1,
        questions: [
            {
                question: "De Broglie wavelength is given by:",
                options: ["λ = h/p", "λ = p/h", "λ = hp", "λ = hν"],
                correctAnswer: 0,
                explanation: "λ = h/mv = h/p."
            },
            {
                question: "In a 1D box of length L, the energy of a particle is proportional to:",
                options: ["L", "L²", "1/L", "1/L²"],
                correctAnswer: 3,
                explanation: "E = n²h² / 8mL²."
            },
            {
                question: "The physical significance of wave function ψ is given by:",
                options: ["ψ", "|ψ|", "|ψ|²", "ψ*"],
                correctAnswer: 2,
                explanation: "Born interpretation: Probability density."
            },
            {
                question: "Photoelectric effect demonstrates:",
                options: ["Wave nature of light", "Particle nature of light", "Interference", "Diffraction"],
                correctAnswer: 1,
                explanation: "Einstein explained it using photons (particles)."
            },
            {
                question: "Planck's constant value is:",
                options: ["6.626 x 10^-34 Js", "3 x 10^8 m/s", "1.6 x 10^-19 C", "9.1 x 10^-31 kg"],
                correctAnswer: 0,
                explanation: "Standard constant."
            }
        ]
    },

    // ==========================================
    // C PROGRAMMING (PPS)
    // ==========================================
    {
        subject: "Programming for Problem Solving",
        unit: 1,
        questions: [
            {
                question: "Which of the following is a valid variable name?",
                options: ["1variable", "_variable", "variable-name", "float"],
                correctAnswer: 1,
                explanation: "Variable names cannot start with digit, contain hyphen, or be a keyword."
            },
            {
                question: "Size of 'float' data type in C is typically:",
                options: ["1 byte", "2 bytes", "4 bytes", "8 bytes"],
                correctAnswer: 2,
                explanation: "Standard size for float."
            },
            {
                question: "Which operator is used for logical AND?",
                options: ["&", "&&", "|", "||"],
                correctAnswer: 1,
                explanation: "&& is Logical AND, & is Bitwise AND."
            },
            {
                question: "printf() is defined in which header file?",
                options: ["conio.h", "stdio.h", "math.h", "string.h"],
                correctAnswer: 1,
                explanation: "Standard Input Output header."
            },
            {
                question: "What is the output of 5 % 2?",
                options: ["2.5", "2", "1", "0"],
                correctAnswer: 2,
                explanation: "Modulus operator returns remainder."
            }
        ]
    },
    {
        subject: "Programming for Problem Solving",
        unit: 2,
        questions: [
            {
                question: "Which loop is guaranteed to execute at least once?",
                options: ["for", "while", "do-while", "None"],
                correctAnswer: 2,
                explanation: "do-while is exit controlled."
            },
            {
                question: "The 'break' statement is used to:",
                options: ["Exit the program", "Exit the current loop/switch", "Skip current iteration", "Restart loop"],
                correctAnswer: 1,
                explanation: "Jumps out of the loop block."
            },
            {
                question: "Syntax for switch statement requires:",
                options: ["float values", "integral values", "strings", "boolean"],
                correctAnswer: 1,
                explanation: "Switch cases must be int or char."
            },
            {
                question: "Operator '==' is used for:",
                options: ["Assignment", "Comparison", "Logical OR", "Bitwise NOT"],
                correctAnswer: 1,
                explanation: "Relational equality operator."
            },
            {
                question: "How many times will `for(i=0; i<5; i++)` run?",
                options: ["4", "5", "6", "Infinite"],
                correctAnswer: 1,
                explanation: "0, 1, 2, 3, 4 (Total 5 times)."
            }
        ]
    },
    // ==========================================
    // BASIC ELECTRICAL ENGINEERING (BEE)
    // ==========================================
    {
        subject: "Basic Electronic Engineering", // Using the name from syllabus_data.dart
        unit: 1,
        questions: [
            {
                question: "The knee voltage for a Silicon diode is approximately:",
                options: ["0.3V", "0.7V", "1.1V", "1.5V"],
                correctAnswer: 1,
                explanation: "Standard cut-in voltage for Si."
            },
            {
                question: "A Zener diode is mostly used as a:",
                options: ["Amplifier", "Oscillator", "Voltage Regulator", "Rectifier"],
                correctAnswer: 2,
                explanation: "In reverse breakdown region, voltage remains constant."
            },
            {
                question: "A half-wave rectifier has an efficiency of:",
                options: ["40.6%", "50%", "81.2%", "100%"],
                correctAnswer: 0,
                explanation: "Max efficiency of HWR."
            },
            {
                question: "In forward bias, the depletion width:",
                options: ["Increases", "Decreases", "Remains same", "Becomes infinite"],
                correctAnswer: 1,
                explanation: "Potential barrier is lowered."
            },
            {
                question: "An ideal diode in reverse bias acts as:",
                options: ["Short circuit", "Open circuit", "Resistor", "Capacitor"],
                correctAnswer: 1,
                explanation: "No current flows (Infinite resistance)."
            }
        ]
    }

];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB for Seeding');

        // Clear existing tests for these subjects/units to avoid duplicates
        for (const t of year1Tests) {
            await Test.deleteMany({ subject: t.subject, unit: t.unit });
            const newTest = new Test(t);
            await newTest.save();
            console.log(`Saved Test: ${t.subject} Unit ${t.unit}`);
        }

        console.log('✅ Year 1 Seed Data Inserted successfully!');
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('❌ Error seeding data:', err);
    });
