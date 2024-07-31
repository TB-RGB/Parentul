const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const { handleChatMessage } = require("../services/chat.service");
const { getUserChatHistory, addUserFeedback, endConversation, getConversationLog, deleteConversation } = require("../models/chat.models");


router.post("/", async (req, res) => {
  try {
    
    const { message, userId } = req.body;
    const { aiResponse, conversationId } = await handleChatMessage(userId, message);
    res.json({aiResponse, conversationId});
  } catch (err) {
    console.error("Error logging chat message:", err);
    res.sendStatus(500).json({error: err});
  }
});

router.get("/history/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const chatHistory = await getUserChatHistory(userId);
    res.json(chatHistory);
  } catch (err) {
    console.error("Error getting chat history:", err);
    res.sendStatus(500).json({error: err});
  }
});

router.get("/log/:conversationId", async (req, res) => {
    try {
        const { conversationId } = req.params;
        const chatLog = await getConversationLog(conversationId);
        res.json(chatLog);
    } catch (err) {
        console.error("Error getting chat log:", err);
        res.sendStatus(500).json({error: err});
    }
});

router.post("/feedback", async (req, res) => {
  try {
    const { userId, conversationId, rating } = req.body;
    await addUserFeedback(userId, conversationId, rating);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error adding user feedback:", err);
    res.sendStatus(500).json({error: err});
  }
});

router.put('/end', async (req, res) => {
  try {
    const { conversationId } = req.body;
    await endConversation(conversationId);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error ending conversation:", err);
    res.sendStatus(500).json({error: err});
  }
});

router.delete("/conversation/:conversationId", async (req, res) => {
  try {
    const { conversationId } = req.params;
    await deleteConversation(conversationId);
    res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting conversation:", err);
    res.status(500).json({error: err.message});
  }
});
module.exports = router;