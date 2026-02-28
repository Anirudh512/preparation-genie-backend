async function test() {
    try {
        console.log("Testing clarify-doubt...");
        const res1 = await fetch('http://localhost:5000/api/ai/clarify-doubt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject: 'Computer Science',
                unit: 1,
                question: 'What is an array?'
            })
        });
        const data1 = await res1.json();
        console.log("Clarify response:", data1);

        console.log("\nTesting generate-test...");
        const res2 = await fetch('http://localhost:5000/api/ai/generate-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                subject: 'Computer Science',
                unit: 1,
                difficulty: 'easy'
            })
        });
        const data2 = await res2.json();
        console.log("Generate Test response:", data2);

    } catch (e) {
        console.error("Test Error:", e);
    }
}
test();
