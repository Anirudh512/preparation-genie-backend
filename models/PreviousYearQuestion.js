const mongoose = require('mongoose');

const PreviousYearQuestionSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    unit: { type: String, required: true }, // "1", "2", etc.
    question: { type: String, required: true },
    year: { type: String, required: true }, // e.g. "2023", "2022"
    priority: { type: String, enum: ['high', 'normal'], default: 'normal' }, // "high" = IMP
    createdAt: { type: Date, default: Date.now }
});

// Compound index for efficient lookup
PreviousYearQuestionSchema.index({ subject: 1, unit: 1 });

module.exports = mongoose.model('PreviousYearQuestion', PreviousYearQuestionSchema);
