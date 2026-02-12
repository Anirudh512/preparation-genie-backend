const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        try {
            console.log('\nFetching Registered Users (inc. Security Info)...\n');
            const users = await User.find({}, 'name username rollNo branch section email securityQuestion securityAnswer'); // Select ALL fields

            if (users.length === 0) {
                console.log('No users found.');
            } else {
                console.table(users.map(u => ({
                    Name: u.name,
                    Username: u.username,
                    "Sec Question": u.securityQuestion,
                    "Sec Answer": u.securityAnswer,
                })));
                console.log(`\nTotal Users: ${users.length}\n`);
            }
        } catch (err) {
            console.error('Error fetching users:', err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error('MongoDB Connection Error:', err));
