// Shared constants to avoid repetition across routes

// Title unlock requirements (1 title per 5 claimed achievements)
const TITLE_REQUIREMENTS = [
    { id: "title_01", req: 5 },
    { id: "title_02", req: 10 },
    { id: "title_03", req: 15 },
    { id: "title_04", req: 20 },
    { id: "title_05", req: 25 },
    { id: "title_06", req: 30 },
    { id: "title_07", req: 35 },
    { id: "title_08", req: 40 },
    { id: "title_09", req: 45 },
    { id: "title_10", req: 50 }
];

// Function to check and unlock titles based on claimed achievements
function checkAndUnlockTitles(user) {
    const claimedCount = user.claimedAchievements.length;
    let titlesUnlocked = false;
    
    TITLE_REQUIREMENTS.forEach(t => {
        if (claimedCount >= t.req && !user.unlockedTitles.includes(t.id)) {
            user.unlockedTitles.push(t.id);
            titlesUnlocked = true;
        }
    });
    
    return titlesUnlocked;
}

module.exports = {
    TITLE_REQUIREMENTS,
    checkAndUnlockTitles
};
