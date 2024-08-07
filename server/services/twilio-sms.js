// twilio-sms.js

require("dotenv").config(); // Make sure to install dotenv: npm install dotenv
const twilio = require("twilio");

// Twilio credentials from environment variables
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

// Initialize Twilio client
const client = twilio(accountSid, authToken);

// Twilio phone number from environment variable
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

/**
 * Send an SMS message using Twilio
 * @param {string} toPhoneNumber - The recipient's phone number
 * @param {string} message - The message to send
 * @returns {Promise} A promise that resolves with the message SID if successful
 */
async function sendSMS(toPhoneNumber, message) {
  try {
    const result = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: toPhoneNumber,
    });
    console.log(`SMS sent successfully. SID: ${result.sid}`);
    return result.sid;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
}

module.exports = { sendSMS };
