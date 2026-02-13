const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/preparation_genie';

mongoose.connect(MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use('/api/tests', require('./routes/tests'));
app.use('/api/admin', require('./routes/admin'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Preparation Genie Backend is Running!');
});

// DEBUG ROUTE (Temporary)
app.get('/api/debug-db', async (req, res) => {
    try {
        const state = mongoose.connection.readyState;
        const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };

        // Try a simple DB operation
        const userCount = await mongoose.model('User').countDocuments();

        res.json({
            status: 'ok',
            dbState: states[state],
            userCount: userCount,
            envUri: process.env.MONGODB_URI ? 'Exists (Hidden)' : 'MISSING'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            error: err.message,
            stack: err.stack
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
