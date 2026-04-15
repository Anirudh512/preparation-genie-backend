const DEFAULT_USER_STATE = {
  achievements: [],
  progress: 0,
  coins: 0,
  ownedTitles: [],
  activeTitle: 'Novice',
  streak: 0,
  maxStreak: 0,
  streakFreezes: 0,
  activeQuests: [],
  testsCompleted: 0,
  readUnits: [],
  testHistory: [],
  equippedTitle: '',
  unlockedTitles: [],
  claimedAchievements: [],
  loginStreak: 0,
};

function isPlainObject(value) {
  return value != null && typeof value === 'object' && !Array.isArray(value);
}

function ensureArray(target, field) {
  if (!Array.isArray(target[field])) {
    target[field] = [];
    return true;
  }
  return false;
}

function ensureNumber(target, field, fallback = 0) {
  const value = Number(target[field]);
  if (!Number.isFinite(value)) {
    target[field] = fallback;
    return true;
  }
  if (target[field] !== value) {
    target[field] = value;
    return true;
  }
  return false;
}

function ensureString(target, field, fallback = '') {
  if (typeof target[field] !== 'string') {
    target[field] = fallback;
    return true;
  }
  return false;
}

function normalizeQuestArray(target) {
  if (!Array.isArray(target.activeQuests)) {
    target.activeQuests = [];
    return true;
  }

  let changed = false;
  target.activeQuests = target.activeQuests
    .filter((quest) => isPlainObject(quest))
    .map((quest) => {
      const nextQuest = { ...quest };
      if (!Number.isFinite(Number(nextQuest.progress))) {
        nextQuest.progress = 0;
        changed = true;
      } else {
        nextQuest.progress = Number(nextQuest.progress);
      }
      if (!Number.isFinite(Number(nextQuest.target))) {
        nextQuest.target = 0;
        changed = true;
      } else {
        nextQuest.target = Number(nextQuest.target);
      }
      if (!Number.isFinite(Number(nextQuest.reward))) {
        nextQuest.reward = 0;
        changed = true;
      } else {
        nextQuest.reward = Number(nextQuest.reward);
      }
      if (typeof nextQuest.claimed !== 'boolean') {
        nextQuest.claimed = false;
        changed = true;
      }
      nextQuest.id = typeof nextQuest.id === 'string' ? nextQuest.id : '';
      nextQuest.title =
        typeof nextQuest.title === 'string' ? nextQuest.title : 'Daily mission';
      nextQuest.questType =
        typeof nextQuest.questType === 'string' ? nextQuest.questType : '';
      return nextQuest;
    });
  return changed;
}

function ensureUserDefaults(userLike) {
  if (!isPlainObject(userLike)) return false;

  let changed = false;

  changed = ensureArray(userLike, 'achievements') || changed;
  changed = ensureArray(userLike, 'ownedTitles') || changed;
  changed = ensureArray(userLike, 'readUnits') || changed;
  changed = ensureArray(userLike, 'testHistory') || changed;
  changed = ensureArray(userLike, 'unlockedTitles') || changed;
  changed = ensureArray(userLike, 'claimedAchievements') || changed;

  changed = normalizeQuestArray(userLike) || changed;

  changed = ensureNumber(userLike, 'progress', DEFAULT_USER_STATE.progress) || changed;
  changed = ensureNumber(userLike, 'coins', DEFAULT_USER_STATE.coins) || changed;
  changed =
    ensureNumber(userLike, 'streak', DEFAULT_USER_STATE.streak) || changed;
  changed =
    ensureNumber(userLike, 'maxStreak', DEFAULT_USER_STATE.maxStreak) || changed;
  changed =
    ensureNumber(
      userLike,
      'streakFreezes',
      DEFAULT_USER_STATE.streakFreezes,
    ) || changed;
  changed =
    ensureNumber(
      userLike,
      'testsCompleted',
      DEFAULT_USER_STATE.testsCompleted,
    ) || changed;
  changed =
    ensureNumber(userLike, 'loginStreak', DEFAULT_USER_STATE.loginStreak) ||
    changed;

  changed =
    ensureString(userLike, 'equippedTitle', DEFAULT_USER_STATE.equippedTitle) ||
    changed;
  changed =
    ensureString(userLike, 'activeTitle', DEFAULT_USER_STATE.activeTitle) ||
    changed;

  return changed;
}

function buildUserDefaults(overrides = {}) {
  const nextUser = {
    ...DEFAULT_USER_STATE,
    ...overrides,
  };
  ensureUserDefaults(nextUser);
  return nextUser;
}

module.exports = {
  DEFAULT_USER_STATE,
  ensureUserDefaults,
  buildUserDefaults,
};
