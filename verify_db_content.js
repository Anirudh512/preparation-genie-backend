const mongoose = require('mongoose');
const StudyContent = require('./models/StudyContent');

// MongoDB Connection
const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ MongoDB Connected');

        const subject = "Matrices and Calculus";
        const unit = "1";

        const content = await StudyContent.findOne({ subject, unit });

        if (content) {
            console.log(`✅ FOUND Content for ${subject} - Unit ${unit}`);
            console.log(`Length: ${content.content.length} chars`);
            console.log(`Snippet: ${content.content.substring(0, 100)}...`);
        } else {
            console.log(`❌ NO CONTENT FOUND for ${subject} - Unit ${unit}`);

            // Debug: List all subjects
            const allSubjects = await StudyContent.find({}, 'subject unit');
            console.log(`\nAvailable Content: ${allSubjects.length} items`);
            allSubjects.slice(0, 5).forEach(c => console.log(`- ${c.subject} (Unit ${c.unit})`));
        }

        mongoose.connection.close();
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
    });
