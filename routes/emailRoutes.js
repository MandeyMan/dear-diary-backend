const express = require('express');
const { sendEmail } = require('../controllers/emailController');

const router = express.Router();

// POST route to send email
router.post('/send-email', sendEmail);

module.exports = router;
