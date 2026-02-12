const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }], // Array of 4 options
    correctAnswer: { type: Number, required: true }, // Index 0-3
    explanation: { type: String, required: true } // Explanation for the answer
});

const TestSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    unit: { type: Number, required: true }, // Unit 1, 2, 3, etc.
    questions: [QuestionSchema]
});

module.exports = mongoose.model('Test', TestSchema);
