async function testClaimAll() {
    try {
        const username = 'Anirudh_J';
        console.log(`Testing Claim All for ${username}...`);

        const response = await fetch('http://localhost:5000/api/user/claim-all-achievements', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        });

        console.log('Status:', response.status);

        if (response.status === 200) {
            const data = await response.json();
            console.log('Unlocked Titles:', data.unlockedTitles ? data.unlockedTitles.length : 0);
            console.log('Claimed Achievements:', data.claimedAchievements ? data.claimedAchievements.length : 0);

            if (data.unlockedTitles && data.unlockedTitles.length > 0) {
                console.log('SUCCESS: Titles unlocked!');
            } else {
                console.log('WARNING: No titles unlocked (maybe already unlocked or logic issue)');
            }
        } else {
            const text = await response.text();
            console.error('Error Response:', text);
        }

    } catch (err) {
        console.error('Error:', err.message);
    }
}

testClaimAll();
