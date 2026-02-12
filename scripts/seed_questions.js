const mongoose = require('mongoose');
const Test = require('../models/Test');

// Use Cloud URI if provided, else Local
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/preparation_genie';

// Import Data Files
const year1Sem1Values = require('./data/year1_sem1');
const year1Sem2Values = require('./data/year1_sem2');
const year2Sem1Values = require('./data/year2_sem1');
const year2Sem2Values = require('./data/year2_sem2');
const year3Sem1Values = require('./data/year3_sem1');
const year3Sem2Values = require('./data/year3_sem2');
const year4Sem1Values = require('./data/year4_sem1');
const year4Sem2Values = require('./data/year4_sem2');

// Combine all tests
const allTests = [
    ...year1Sem1Values,
    ...year1Sem2Values,
    ...year2Sem1Values,
    ...year2Sem2Values,
    ...year3Sem1Values,
    ...year3Sem2Values,
    ...year4Sem1Values,
    ...year4Sem2Values
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB for Comprehensive Seeding');

        let count = 0;
        for (const t of allTests) {
            // Upsert: Update if exists, Insert if not
            const result = await Test.findOneAndUpdate(
                { subject: t.subject, unit: t.unit },
                { $set: t },
                { upsert: true, new: true }
            );
            console.log(`Saved: ${t.subject} Unit ${t.unit} (${t.questions.length} Qs)`);
            count++;
        }

        console.log(`✅ Successfully seeded ${count} tests!`);
        mongoose.disconnect();
    })
    .catch(err => {
        console.error('❌ Error seeding data:', err);
        mongoose.disconnect();
    });
