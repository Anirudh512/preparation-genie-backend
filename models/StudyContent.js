const mongoose = require('mongoose');

const StudyContentSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    unit: { type: String, required: true }, // "1", "2", etc.
    content: { type: String, required: true }, // The markdown/text content
    lastUpdated: { type: Date, default: Date.now },
    updatedBy: { type: String, default: "Admin" }
});

// Composite key to ensure one content entry per Subject+Unit
StudyContentSchema.index({ subject: 1, unit: 1 }, { unique: true });

module.exports = mongoose.model('StudyContent', StudyContentSchema);
