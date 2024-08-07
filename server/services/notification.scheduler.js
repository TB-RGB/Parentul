const Queue = require("bull");
const pool = require("../modules/pool");
const sendEmail = require("../services/sendGrid");
const { sendSMS } = require("../services/twilio-sms");

// Create a new queue
const notificationQueue = new Queue(
  "notification-queue",
  process.env.REDIS_URL
);

const scheduleNotification = async (
  userId,
  conversationId,
  conversationLog
) => {
  try {
    // Fetch user data and preferences
    const userQuery = `
      SELECT 
        users.id, 
        users.email, 
        users.first_name,
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

    if (userData.notifications_freq === "none") {
      console.log(`User ${userId} has notifications disabled.`);
      return;
    }

    const delayHours = userData.notifications_freq === "24" ? 24 : 48;
    const delayMilliseconds = delayHours * 60 * 60 * 1000;
    // const delayMilliseconds = 60 * 60 * 1000; //4 hour test

    // Add job to the queue
    await notificationQueue.add(
      {
        userId,
        conversationId,
        userData,
        conversationLog,
      },
      {
        delay: delayMilliseconds,
        attempts: 1,
      }
    );

    console.log(
      `Notification scheduled for user ${userId}, conversation ${conversationId} in ${delayHours} hours`
    );
  } catch (error) {
    console.error("Error scheduling notification:", error);
  }
};

// Process jobs
notificationQueue.process(async (job) => {
  const { userId, conversationId, userData, conversationLog } = job.data;

  try {
    const followUpQuery =
      "SELECT * FROM follow_ups WHERE conversation_id = $1 AND user_id = $2";
    const followUpResult = await pool.query(followUpQuery, [
      conversationId,
      userId,
    ]);
    const followUp = followUpResult.rows[0];

    if (followUp) {
      const question = followUp.question_text;

      if (userData.notifications_email && userData.email) {
        console.log("Attempting to send email to:", userData.email);

        const formattedConversationLog = conversationLog
          .map((entry) => {
            const senderName =
              entry.sender_type === "ai"
                ? "Parentül Chat"
                : userData.first_name;
            return `<strong>${senderName}</strong>: ${entry.content}`;
          })
          .join("<br>");

        const emailBody = `
  Hello ${userData.first_name},
  ${question}
  Here's a recap of your conversation:
  ${formattedConversationLog}
  We look forward to your response!
  Best regards,
  The Parentül Team
          `.trim();

        await sendEmail(
          userData.email,
          `Parentül Follow-up: ${question}`,
          emailBody
        );
      } else if (userData.notifications_email) {
        console.error("Email address is missing for user:", userId);
      }

      // if (userData.notifications_sms && userData.phone_number) {
      //   console.log('Attempting to send SMS to:', userData.phone_number);
      //   await sendSMS(userData.phone_number, question);
      // }

      console.log(
        `Notification sent for user ${userId}, conversation ${conversationId}`
      );
    } else {
      console.log(
        `No follow-up found for user ${userId}, conversation ${conversationId}`
      );
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    throw error;
  }
});

async function checkJobStatus() {
  const jobCounts = await notificationQueue.getJobCounts();
  const waitingJobs = await notificationQueue.getWaiting();
  const activeJobs = await notificationQueue.getActive();
  const delayedJobs = await notificationQueue.getDelayed();
  const completedJobs = await notificationQueue.getCompleted();
  const failedJobs = await notificationQueue.getFailed();

  return {
    counts: jobCounts,
    waiting: waitingJobs.map((job) => ({ id: job.id, data: job.data })),
    active: activeJobs.map((job) => ({ id: job.id, data: job.data })),
    delayed: delayedJobs.map((job) => ({ id: job.id, data: job.data })),
    completed: completedJobs.map((job) => ({ id: job.id, data: job.data })),
    failed: failedJobs.map((job) => ({ id: job.id, data: job.data })),
  };
}

module.exports = { scheduleNotification, checkJobStatus };
