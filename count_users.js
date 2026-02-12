const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        try {
            const count = await User.countDocuments();
            console.log(`\n📊 Total Registered Members: ${count}\n`);
        } catch (err) {
            console.error('Error counting users:', err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error('MongoDB Connection Error:', err));
