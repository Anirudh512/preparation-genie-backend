const https = require('https');

const data = JSON.stringify({
    username: "debug_user_" + Math.floor(Math.random() * 1000),
    email: "debug" + Math.floor(Math.random() * 1000) + "@test.com",
    pin: "1234",
    name: "Debug User",
    rollNo: "123456",
    branch: "CSE",
    section: "A",
    securityQuestion: "Who is your fav person?",
    securityAnswer: "me"
});

const options = {
    hostname: 'preparation-genie-backend.onrender.com',
    port: 443,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

console.log("Attempting to Register via HTTPS...");

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);

    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        console.log('BODY:', body);
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

req.write(data);
req.end();
