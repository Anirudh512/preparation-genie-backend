const mongoose = require('mongoose');
const User = require('./models/User');

// Use the Cloud URI passed via terminal
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/preparation_genie';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB...');
        console.log(`Checking users in: ${MONGODB_URI.split('@')[1] || 'Localhost'}`); // Hide password in log

        const users = await User.find({}, 'username email pin');

        console.log(`\nFound ${users.length} Users:`);
        console.log('------------------------------------------------');
        users.forEach(u => {
            console.log(`- Username: ${u.username} | PIN: ${u.pin} | Email: ${u.email}`);
        });
        console.log('------------------------------------------------');

        mongoose.disconnect();
    })
    .catch(err => {
        console.error('❌ Connection Error:', err);
    });
