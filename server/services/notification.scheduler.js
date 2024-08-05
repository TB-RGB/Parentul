const cron = require('node-cron');
const pool = require("../modules/pool");
const sendEmail = require('../services/sendGrid');
const { sendSMS } = require('../services/twilio-sms');

// Store active jobs
const activeJobs = new Map();

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

    const delayMinutes = userData.notifications_freq === '24' ? 1 : 2; // For testing: 1 minute for 24h, 2 minutes for 48h
    
    const job = cron.schedule(`*/${delayMinutes} * * * *`, async () => {
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
              await sendEmail(userData.email, 'Parentul Follow-up', message);
            }
          }

          if (userData.notifications_sms && userData.phone_number) {
            console.log('Attempting to send SMS to:', userData.phone_number);
            await sendSMS(userData.phone_number, 'Follow-up question for your recent conversation:', message);
          }

          console.log(`Notification sent for user ${userId}, conversation ${conversationId}`);
        } else {
          console.log(`No follow-up found for user ${userId}, conversation ${conversationId}`);
        }

        // Stop the job after sending the notification or if no follow-up was found
        job.stop();
        activeJobs.delete(`${userId}-${conversationId}`);
        console.log(`Job for user ${userId}, conversation ${conversationId} has run and stopped.`);
      } catch (error) {
        console.error('Error sending notification:', error);
        // Stop the job even if there was an error
        job.stop();
        activeJobs.delete(`${userId}-${conversationId}`);
        console.log(`Job for user ${userId}, conversation ${conversationId} encountered an error and has stopped.`);
      }
    });

    // Store the job
    activeJobs.set(`${userId}-${conversationId}`, job);

    console.log(`Notification scheduled for user ${userId}, conversation ${conversationId} to run after ${delayMinutes} minutes`);

  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

module.exports = { scheduleNotification };