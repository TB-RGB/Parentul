const express = require('express');
const router = express.Router();
const { checkJobStatus } = require('../services/notification.scheduler')
const { sendSMS } = require('../services/twilio-sms');

const sendEmail = require('../services/sendGrid')
const pool = require("../modules/pool");


router.post('/send-sms', async (req, res) => {
  const { userId, message } = req.body;

  try {
    // Fetch user preferences from the database
    const userPreferences = await getUserPreferences(userId);

    if (userPreferences.notifications_sms && userPreferences.phone_number) {
      const messageSid = await sendSMS(userPreferences.phone_number, message);
      res.json({ success: true, messageSid });
    } else {
      res.status(400).json({ success: false, message: 'SMS notifications not enabled for this user or phone number not set' });
    }
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    res.status(500).json({ success: false, message: 'Failed to send SMS notification' });
  }
});


async function getUserPreferences(userId) {
  const query = 'SELECT * FROM user_preferences WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[0];
}


router.post('/test-email', async (req, res) => {
    const { to, subject, text } = req.body;
    try {
        await sendEmail(to, subject, text);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

router.get('/job-status', async (req, res) => {
    try {
      const jobStatus = await checkJobStatus();
      res.json(jobStatus);
    } catch (error) {
      console.error('Error fetching job status:', error);
      res.status(500).json({ error: 'Failed to fetch job status' });
    }
  });

module.exports = router;