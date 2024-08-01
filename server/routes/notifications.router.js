const express = require('express');
const router = express.Router();
const { sendSMS } = require('../services/twilio-sms');
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

router.post('/test-sms', async (req, res) => {
    const testPhoneNumber = req.body.phoneNumber; // The phone number to send the test SMS to
    const testMessage = "This is a test SMS from your application!";
  
    try {
      const messageSid = await sendSMS(testPhoneNumber, testMessage);
      res.json({ success: true, message: 'Test SMS sent successfully', messageSid });
    } catch (error) {
      console.error('Error sending test SMS:', error);
      res.status(500).json({ success: false, message: 'Failed to send test SMS', error: error.message });
    }
  });

async function getUserPreferences(userId) {
  const query = 'SELECT * FROM user_preferences WHERE user_id = $1';
  const result = await pool.query(query, [userId]);
  return result.rows[0];
}



module.exports = router;