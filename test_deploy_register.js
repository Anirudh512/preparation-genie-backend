const axios = require('axios');

const API_URL = 'https://preparation-genie-backend.onrender.com/api/auth/register';

const testUser = {
    username: "debug_user_" + Math.floor(Math.random() * 1000),
    email: "debug" + Math.floor(Math.random() * 1000) + "@test.com",
    pin: "1234",
    name: "Debug User",
    rollNo: "123456",
    branch: "CSE",
    section: "A",
    securityQuestion: "Who is your fav person?",
    securityAnswer: "me"
};

console.log(`Attempting to Register: ${testUser.username}...`);

axios.post(API_URL, testUser)
    .then(res => {
        console.log("✅ Registration SUCCESS!");
        console.log("Status:", res.status);
        console.log("Body:", res.data);
    })
    .catch(err => {
        console.log("❌ Registration FAILED");
        if (err.response) {
            console.log("Status:", err.response.status);
            console.log("Data:", err.response.data);
        } else {
            console.log("Error:", err.message);
        }
    });
