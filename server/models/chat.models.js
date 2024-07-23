const pool = require("../modules/pool");

async function logChatHistory(userId, userMessage, aiResponse) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // New Conversation
    const conversationQuery = `
            INSERT INTO conversations (user_id, start_time)
            VALUES ($1, NOW())
            RETURNING id;
            `;
    const conversationResult = await client.query(conversationQuery, [userId]);
    const conversationId = conversationResult.rows[0].id;

    // New User Message
    const userMessageQuery = `
            INSERT INTO messages (conversation_id, sender_type, content, timestamp)
            Values ($1, 'user', $2, NOW());
            `;

    await client.query(userMessageQuery, [conversationId, userMessage]);

    // New AI Message
    const aiMessageQuery = `
            INSERT INTO messages (conversation_id, sender_type, content, timestamp)
            VALUES ($1, 'ai', $2, NOW())
            RETURNING id;
            `;
    const aiMessageResult = await client.query(aiMessageQuery, [
      conversationId,
      aiResponse.text,
    ]);
    const aiMessageId = aiMessageResult.rows[0].id;

    const aiResponseQuery = `
            INSERT INTO ai_responses (message_id, response_type, confidence_score, processing_time)
            VALUES ($1, $2, $3, $4);
            `;
    await client.query(aiResponseQuery, [
      aiMessageId,
      aiResponse.category,
      aiResponse.confidence || 0.5,
      aiResponse.processingTime || 0,
    ]);

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error logging chat message:", err);
  } finally {
    client.release();
  }
}

async function getUserChatHistory(userId) {
    const queryText = `
    SELECT conversations.id, conversations.start_time, conversations.end_time,
    messages.id, messages.sender_type, messages.content, messages.timestamp,
    FROM conversations
    JOIN messages ON conversations.id = messages.conversation_id
    WHERE conversations.user_id = $1
    ORDER BY conversations.start_time DESC, messages.timestamp ASC;
    `

    try {
        const result = await pool.query(queryText, [userId]);
        return result.rows;
    } catch (err) {
        console.error("Error getting user chat history:", err);
    }
}

async function addUserFeedback(userId, conversationId, rating) {
    const queryText = `
    INSERT INTO user_feedback (conversation_id, user_id, rating, created_at)
    VALUES ($1, $2, $3, NOW());
    `
    try {
        await pool.query(queryText, [conversationId, userId, rating]);
    } catch (err) {
        console.error("Error adding user feedback:", err);
    }
}

async function endConversation(conversationId) {
    const queryText = `
      UPDATE conversations
      SET end_time = NOW()
      WHERE id = $1;
    `;
    try {
      await pool.query(queryText, [conversationId]);
    } catch (err) {
      console.error("Error ending conversation:", err);
      throw err;
    }
  }

module.exports = {
    logChatHistory,
    getUserChatHistory,
    addUserFeedback,
    endConversation
}
