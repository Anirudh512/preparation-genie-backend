const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';

const StudyContentSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    unit: { type: String, required: true },
    content: { type: String, required: true }
});

const StudyContent = mongoose.model('StudyContent', StudyContentSchema);

async function check() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to DB");

        const userCount = await mongoose.connection.db.collection('users').countDocuments();
        console.log(`User Count in Localhost DB: ${userCount}`);

        const doc = await StudyContent.findOne({ subject, unit });

        if (doc) {
            console.log("✅ FOUND DOCUMENT:");
            console.log(JSON.stringify(doc, null, 2));
        } else {
            console.log("❌ DOCUMENT NOT FOUND");

            // Basic debug: list all for this subject
            console.log("Checking for ANY unit for this subject...");
            const allDocs = await StudyContent.find({ subject });
            console.log(`Found ${allDocs.length} docs for subject '${subject}'`);
            allDocs.forEach(d => console.log(`- Unit: '${d.unit}'`));
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

check();
