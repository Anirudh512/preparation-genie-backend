require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { ensureUserDefaults } = require('../lib/userDefaults');

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/preparation_genie';

async function backfillUserDefaults() {
  await mongoose.connect(MONGODB_URI);

  const users = await User.find({});
  let updatedCount = 0;

  for (const user of users) {
    const changed = ensureUserDefaults(user);
    if (!changed) continue;

    await user.save();
    updatedCount += 1;
    console.log(`Updated ${user.username}`);
  }

  console.log(`Backfill complete. Updated ${updatedCount} user(s).`);
}

backfillUserDefaults()
  .catch((error) => {
    console.error('Backfill failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await mongoose.disconnect();
    } catch (_) {
      // Ignore disconnect issues during script shutdown.
    }
  });
