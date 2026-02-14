const axios = require('axios');

async function testAdmin() {
    try {
        const url = 'https://preparation-genie-backend.onrender.com/api/admin/login';
        const payload = { username: 'ADMIN_1', pin: '7569527481' };
        console.log(`Sending POST to ${url} with`, payload);

        const res = await axios.post(url, payload);
        console.log('Status:', res.status);
        console.log('Data:', res.data);
    } catch (err) {
        if (err.response) {
            console.log('Error Status:', err.response.status);
            console.log('Error Data:', err.response.data);
        } else {
            console.log('Error:', err.message);
        }
    }
}

testAdmin();
