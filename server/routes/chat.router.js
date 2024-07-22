const express = require('express');
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const router = express.Router();
const { AIChatEngine } = require('../aiChatEngine');

const chatEngine = new AIChatEngine();

router.post('/chat', async (req, res) => {
    try {
        console.log('HTTP Chat Request Received');
        const { message, userId } = req.body.message;
        const aiResponse = await chatEngine.generateResponse(message);
        console.log('AI Response (HTTP):', aiResponse);

        const client = await pool.connect();
        try{
            await client.query('BEGIN')
            // New Conversation
            const conversationQuery = `
            INSERT INTO conversations (user_id, start_time)
            VALUES ($1, NOW())
            RETURNING id
            `
            const conversationResult = await client.query(conversationQuery, [userId]);
            const conversationId = conversationResult.rows[0].id;

            // New User Message
            const userMessageQuery = `
            INSERT INTO messages (conversation_id, sender_type, content, timestamp)
            Values ($1, 'user', $2, NOW())
            `;

            await client.query(userMessageQuery, [conversationId, message]);

            // New AI Message
            const aiMessageQuery = `
            INSERT INTO messages (conversation_id, sender_type, content, timestamp)
            VALUES ($1, 'ai', $2, NOW())
            RETURNING id
            `

        }
        
    } catch (err) {

    }
})