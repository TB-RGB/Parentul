const Queue = require('bull');
const pool = require("../modules/pool");
const sendEmail = require('../services/sendGrid');
const { sendSMS } = require('../services/twilio-sms');
const { delay } = require('redux-saga/effects');

// Create a new queue
const notificationQueue = new Queue('notification-queue', process.env.REDIS_URL);

async function checkJobStatus() {
    // Get counts of jobs in different states
    const jobCounts = await notificationQueue.getJobCounts();
    console.log('Job counts:', jobCounts);
  
    // Get all waiting jobs
    const waitingJobs = await notificationQueue.getWaiting();
    console.log('Waiting jobs:', waitingJobs.length);
  
    // Get all active jobs
    const activeJobs = await notificationQueue.getActive();
    console.log('Active jobs:', activeJobs.length);
  
    // Get all delayed jobs
    const delayedJobs = await notificationQueue.getDelayed();
    console.log('Delayed jobs:', delayedJobs.length);
  
    // Get all completed jobs
    const completedJobs = await notificationQueue.getCompleted();
    console.log('Completed jobs:', completedJobs.length);
  
    // Get all failed jobs
    const failedJobs = await notificationQueue.getFailed();
    console.log('Failed jobs:', failedJobs.length);
  }
  
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

    // console.log('User data:', userData);

    if (userData.notifications_freq === 'none') {
      console.log(`User ${userId} has notifications disabled.`);
      return;
    }

    const delayHours = userData.notifications_freq === '24' ? 24 : 48;
    // const delayMilliseconds = delayHours * 60 * 60 * 1000;
    const delayMilliseconds = 4 * 60 * 60 * 1000; //4 hour test

    // Add job to the queue
    await notificationQueue.add(
      {
        userId,
        conversationId,
        userData
      },
      {
        delay: delayMilliseconds,
        attempts: 1
      }
    );

    console.log(`Notification scheduled for user ${userId}, conversation ${conversationId} in ${delayHours} hours`);
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
};

// Process jobs
notificationQueue.process(async (job) => {
  const { userId, conversationId, userData } = job.data;

  try {
    // Fetch the follow-up record
    const followUpQuery = 'SELECT * FROM follow_ups WHERE conversation_id = $1 AND user_id = $2';
    const followUpResult = await pool.query(followUpQuery, [conversationId, userId]);
    const followUp = followUpResult.rows[0];

    if (followUp) {
      const message = `${followUp.question_text}`;

      if (userData.notifications_email) {
        console.log('Attempting to send email to:', userData.email);
        if (userData.email) {
          await sendEmail(userData.email, `Parentul Follow-up`, message);
        } else {
          console.error('Email address is missing for user:', userId);
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
    throw error; 
  }
});

module.exports = { scheduleNotification, checkJobStatus };