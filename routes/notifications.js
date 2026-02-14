const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');

// GET: Fetch notifications for a specific user
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;

        // Fetch notifications that are either target='all' OR target='user' with username
        // We can also add target='branch' logic if we fetch user details first

        // 1. Get User Details to know branch (Optional, for now kept simple)
        const user = await User.findOne({ username });
        const userBranch = user ? user.branch : null;

        const query = {
            $or: [
                { target: 'all' },
                { target: 'user', targetValue: username },
                // { target: 'branch', targetValue: userBranch } // Future scope
            ]
        };

        // Sort by date desc, limit to 20
        const notifications = await Notification.find(query).sort({ date: -1 }).limit(20);

        // Add 'isRead' flag dynamically
        const result = notifications.map(n => ({
            _id: n._id,
            title: n.title,
            message: n.message,
            type: n.type,
            date: n.date,
            isRead: n.readBy.includes(username)
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// PUT: Mark notification as read
router.put('/:id/read', async (req, res) => {
    try {
        const { id } = req.params;
        const { username } = req.body;

        if (!username) return res.status(400).json({ msg: 'Username required' });

        const notification = await Notification.findById(id);
        if (!notification) return res.status(404).json({ msg: 'Notification not found' });

        if (!notification.readBy.includes(username)) {
            notification.readBy.push(username);
            await notification.save();
        }

        res.json({ msg: 'Marked as read' });
    } catch (err) {
        res.status(500).json({ msg: 'Server Error' });
    }
});

// POST: Admin Broadcast
router.post('/broadcast', async (req, res) => {
    try {
        const { title, message, type, target, targetValue } = req.body;

        // TODO: Verify Admin here (middleware) or trust caller for now (MVP)

        const newNotification = new Notification({
            title,
            message,
            type: type || 'info',
            target: target || 'all',
            targetValue
        });

        await newNotification.save();
        res.json(newNotification);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }
});

module.exports = router;
