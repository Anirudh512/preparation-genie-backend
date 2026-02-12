const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = 'mongodb://localhost:27017/preparation_genie';
const usernameToDelete = process.argv[2]; // Get username from command line argument

if (!usernameToDelete) {
    console.error('Usage: node delete_user.js <username>');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(async () => {
        try {
            const result = await User.deleteOne({ username: usernameToDelete });

            if (result.deletedCount === 1) {
                console.log(`\n✅ Successfully deleted user: ${usernameToDelete}\n`);
            } else {
                console.log(`\n❌ User not found with username: ${usernameToDelete}\n`);
            }
        } catch (err) {
            console.error('Error deleting user:', err);
        } finally {
            mongoose.connection.close();
        }
    })
    .catch(err => console.error('MongoDB Connection Error:', err));
