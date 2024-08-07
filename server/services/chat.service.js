const { AIChatEngine } = require("../aiChatEngine");
const { logChatHistory } = require("../models/chat.models");

const chatEngine = new AIChatEngine();

async function handleChatMessage(userId, message) {
  try {
    const aiResponse = await chatEngine.generateResponse(message);
    console.log("AI Response:", aiResponse);

    //Log chat history
    const conversationId = await logChatHistory(userId, message, aiResponse);
    return { aiResponse, conversationId };
  } catch (err) {
    console.error("Error handling chat message:", err);
  }
}

module.exports = {
  handleChatMessage,
};
