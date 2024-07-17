const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('project'));

// Handle language change
app.post('/change-language', (req, res) => {
    const { language } = req.body;
    // Handle language change logic here
    res.send(`Language changed to ${language}`);
});

// Handle chat messages and send to Telegram
app.post('/send-message', (req, res) => {
    const { message } = req.body;
    const TELEGRAM_BOT_TOKEN = 'YOUR_TELEGRAM_BOT_TOKEN';
    const TELEGRAM_CHAT_ID = 'YOUR_TELEGRAM_CHAT_ID';

    axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message
    })
    .then(response => {
        res.send('Message sent');
    })
    .catch(error => {
        res.status(500).send('Error sending message');
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
