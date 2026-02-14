const mongoose = require('mongoose');

const SyllabusSchema = new mongoose.Schema({
    yearSem: { type: String, required: true, unique: true }, // e.g., "B.Tech-I-I Sem"
    subjects: [
        {
            name: { type: String, required: true },
            units: [{ type: String }] // ["Unit 1", "Unit 2", ...]
        }
    ]
});

module.exports = mongoose.model('Syllabus', SyllabusSchema);
