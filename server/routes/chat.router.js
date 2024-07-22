const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const { handleChatMessage } = require("../services/chat.service");
const { getUserChatHistory, addUserFeedback } = require("../models/chat.models");


router.post("/chat", async (req, res) => {
  try {
    
    const { message, userId } = req.body.message;
    const { aiResponse, conversationId } = await handleChatMessage(userId, message);
    res.json({aiResponse, conversationId});
  } catch (err) {
    console.error("Error logging chat message:", err);
    res.sendStatus(500).json({error: err});
  }
});

router.get("/chat/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const chatHistory = await getUserChatHistory(userId);
    res.json(chatHistory);
  } catch (err) {
    console.error("Error getting chat history:", err);
    res.sendStatus(500).json({error: err});
  }
});

router.post("/chat/feedback", async (req, res) => {
  try {
    const { userId, conversationId, rating } = req.body;
    await addUserFeedback(userId, conversationId, rating);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error adding user feedback:", err);
    res.sendStatus(500).json({error: err});
  }
});

module.exports = router;