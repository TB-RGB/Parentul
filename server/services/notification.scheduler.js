const pool = require("../modules/pool");
const sendEmail = require('../services/sendGrid');
const { sendSMS } = require('../services/twilio-sms');

const scheduleNotification = async (userId, conversationId) => {
  try {
    // Fetch user data and preferences
    const userQuery = `
      SELECT 
        users.id, 
        users.email, 
        user_preferences.notifications_email, 
        user_preferences.notifications_sms, 
        user_preferences.notifications_freq, 
        user_preferences.phone_number
      FROM users
      LEFT JOIN user_preferences ON users.id = user_preferences.user_id
      WHERE users.id = $1
    `;
    const userResult = await pool.query(userQuery, [userId]);
    const userData = userResult.rows[0];

    if (!userData) {
      console.error(`No user found for ID ${userId}`);
      return;
    }

    console.log('User data:', userData);

    if (userData.notifications_freq === 'none') {
      console.log(`User ${userId} has notifications disabled.`);
      return;
    }

    const delayHours = userData.notifications_freq === '24' ? 24 : 48;
    const delayMilliseconds = delayHours * 60 * 60 * 1000
    // const delayMilliseconds = 5 * 1000; // 10 seconds for testing

    setTimeout(async () => {
      try {
        // Fetch the follow-up record
        const followUpQuery = 'SELECT * FROM follow_ups WHERE conversation_id = $1 AND user_id = $2';
        const followUpResult = await pool.query(followUpQuery, [conversationId, userId]);
        const followUp = followUpResult.rows[0];

        if (followUp) {
          // Send notification
          const message = `${followUp.question_text}`;

          if (userData.notifications_email) {
            console.log('Attempting to send email to:', userData.email);
            if (!userData.email) {
              console.error('Email address is missing for user:', userId);
            } else {
              await sendEmail(userData.email, `Parentul Follow-up`, message);
            }
          }

          if (userData.notifications_sms && userData.phone_number) {
            console.log('Attempting to send SMS to:', userData.phone_number);
            await sendSMS(userData.phone_number, message);
          }

          console.log(`Notification sent for user ${userId}, conversation ${conversationId}`);
        } else {
          console.log(`No follow-up found for user ${userId}, conversation ${conversationId}`);
        }
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }, delayMilliseconds);

  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

module.exports = { scheduleNotification };