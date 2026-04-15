const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const User = require('../models/User');
const AchievementItem = require('../models/AchievementItem');
const TitleItem = require('../models/TitleItem');
const { ensureUserDefaults } = require('../lib/userDefaults');

function toNumber(value) {
  return Number(value || 0);
}

function buildAccuracyRows(testHistory) {
  const bySubject = new Map();

  for (const item of testHistory) {
    const subject = String(item.subject || 'General').trim() || 'General';
    const score = Math.max(0, toNumber(item.score));
    const total = Math.max(0, toNumber(item.totalQuestions));
    if (!bySubject.has(subject)) {
      bySubject.set(subject, {
        subject,
        attempts: 0,
        correct: 0,
        total: 0,
      });
    }
    const current = bySubject.get(subject);
    current.attempts += 1;
    current.correct += score;
    current.total += total;
  }

  return Array.from(bySubject.values())
    .map((item) => ({
      subject: item.subject,
      attempts: item.attempts,
      correct: item.correct,
      total: item.total,
      accuracy: item.total > 0 ? Number(((item.correct / item.total) * 100).toFixed(1)) : 0,
    }))
    .sort((a, b) => b.accuracy - a.accuracy || b.attempts - a.attempts || a.subject.localeCompare(b.subject));
}

router.get('/profile-dashboard/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    const wasNormalized = ensureUserDefaults(user);
    if (wasNormalized) {
      await user.save();
    }
    const normalizedUser = user.toObject();

    const notifications = await Notification.find({
      $or: [
        { target: 'all' },
        { target: 'user', targetValue: username },
      ],
    })
      .sort({ date: -1 })
      .limit(20)
      .lean();

    const unreadNotifications = notifications.filter((item) => !Array.isArray(item.readBy) || !item.readBy.includes(username)).length;
    const titlesCount = await TitleItem.countDocuments();
    const achievementsCount = await AchievementItem.countDocuments();

    const testHistory = Array.isArray(normalizedUser.testHistory)
      ? [...normalizedUser.testHistory]
      : [];
    const recentTests = testHistory
      .sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
      .slice(0, 8)
      .map((item) => {
        const score = Math.max(0, toNumber(item.score));
        const totalQuestions = Math.max(0, toNumber(item.totalQuestions));
        return {
          id: item._id ? String(item._id) : `${item.subject || 'test'}-${item.unit || '0'}-${item.date || Date.now()}`,
          subject: String(item.subject || 'General'),
          unit: String(item.unit || '-'),
          score,
          totalQuestions,
          accuracy: totalQuestions > 0 ? Number(((score / totalQuestions) * 100).toFixed(1)) : 0,
          date: item.date || null,
        };
      });

    const bySubject = buildAccuracyRows(testHistory).slice(0, 6);
    const totalCorrect = bySubject.reduce((sum, item) => sum + item.correct, 0);
    const totalQuestions = bySubject.reduce((sum, item) => sum + item.total, 0);
    const overallAccuracy = totalQuestions > 0 ? Number(((totalCorrect / totalQuestions) * 100).toFixed(1)) : 0;
    const completedAchievements = Array.isArray(normalizedUser.achievements)
      ? normalizedUser.achievements.length
      : 0;
    const claimedAchievements = Array.isArray(normalizedUser.claimedAchievements)
      ? normalizedUser.claimedAchievements.length
      : 0;
    const unlockedTitles = Array.isArray(normalizedUser.unlockedTitles)
      ? normalizedUser.unlockedTitles.length
      : 0;
    const readUnits = Array.isArray(normalizedUser.readUnits)
      ? normalizedUser.readUnits.length
      : 0;
    const activeQuests = Array.isArray(normalizedUser.activeQuests)
      ? normalizedUser.activeQuests
      : [];
    const completedQuests = activeQuests.filter((quest) => quest.progress >= quest.target).length;

    res.json({
      student: {
        username: user.username || '',
        name: normalizedUser.name || 'Student',
        email: normalizedUser.email || '',
        rollNo: normalizedUser.rollNo || '',
        branch: normalizedUser.branch || '',
        section: normalizedUser.section || '',
        equippedTitle:
          normalizedUser.equippedTitle || normalizedUser.activeTitle || '',
      },
      stats: {
        overallProgress: Number(toNumber(normalizedUser.progress).toFixed(1)),
        testsCompleted: toNumber(normalizedUser.testsCompleted),
        overallAccuracy,
        totalQuestions,
        totalCorrect,
        readUnits,
      },
      gamification: {
        coins: toNumber(normalizedUser.coins),
        streak: toNumber(normalizedUser.streak || normalizedUser.loginStreak),
        maxStreak: toNumber(
          normalizedUser.maxStreak || normalizedUser.loginStreak,
        ),
        loginStreak: toNumber(normalizedUser.loginStreak),
        streakFreezes: toNumber(normalizedUser.streakFreezes),
        completedAchievements,
        claimedAchievements,
        unlockedTitles,
      },
      activity: {
        recentTestsCount: recentTests.length,
        lastTestAt: recentTests[0]?.date || null,
        activeQuestCount: activeQuests.length,
        completedQuestCount: completedQuests,
        unreadNotifications,
      },
      accuracy: {
        overallAccuracy,
        bySubject,
      },
      history: {
        recentTests,
      },
      actionsMeta: {
        unreadNotifications,
        availableTitles: titlesCount,
        availableAchievements: achievementsCount,
      },
    });
  } catch (err) {
    console.error('Profile dashboard error:', err);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
