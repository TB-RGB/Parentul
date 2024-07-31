const pool = require("../modules/pool");

async function logChatHistory(userId, userMessage, aiResponse) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    // ? Check if conversation exists
    const checkConversationQuery = `
    SELECT id FROM conversations
    WHERE user_id = $1 AND end_time IS NULL
    ORDER BY start_time DESC
    LIMIT 1;
    `
    const conversationCheck = await client.query(checkConversationQuery, [userId]);
    let conversationId;
    
    if (conversationCheck.rows.length === 0) {
    // ? if no conversation ongoing, make new conversation
    const newConversationQuery = `
            INSERT INTO conversations (user_id, start_time)
            VALUES ($1, NOW())
            RETURNING id;
            `;
    const newConversation = await client.query(newConversationQuery, [userId]);
    conversationId = newConversation.rows[0].id;
    } else {
        // ? use existing conversation
        
        conversationId = conversationCheck.rows[0].id;
        console.log(conversationId);
    }

    // ? Log User Message
    const userMessageQuery = `
            INSERT INTO messages (conversation_id, sender_type, content, timestamp)
            VALUES ($1, 'user', $2, NOW());
            `;

    await client.query(userMessageQuery, [conversationId, userMessage]);

    // ? Log AI Response
    const aiResponseQuery = `
            INSERT INTO messages (conversation_id, sender_type, content, timestamp)
            VALUES ($1, 'ai', $2, NOW())
            RETURNING id;
            `;
    const aiResponseResult = await client.query(aiResponseQuery, [
      conversationId,
      aiResponse.text,
    ]);
    const aiResponseId = aiResponseResult.rows[0].id;
    // ? Log AI Response Details
    const responseDetailsQuery = `
            INSERT INTO ai_responses (message_id, response_type, confidence_score, processing_time)
            VALUES ($1, $2, $3, $4);
            `;
    await client.query(responseDetailsQuery, [
      aiResponseId,
      aiResponse.category,
      aiResponse.confidence || 0.5,
      aiResponse.processingTime || 0,
    ]);

    await client.query("COMMIT");
    return conversationId;
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error logging chat message:", err);
    throw err;
  } finally {
    client.release();
  }
}

async function getUserChatHistory(userId) {
    const queryText = `
    WITH RankedMessages AS (
        SELECT 
        messages.conversation_id,
        messages.sender_type,
        messages.content,
        messages.timestamp,
        ROW_NUMBER() OVER (PARTITION BY messages.conversation_id, messages.sender_type ORDER BY messages.timestamp ASC) AS row_number
        FROM messages
    )
    SELECT
        conversations.id, conversations.start_time, conversations.end_time,
        user_messages.content AS user_message,
        ai_messages.content AS ai_response,
        user_feedback.rating AS user_rating
    FROM conversations
    LEFT JOIN user_feedback ON user_feedback.conversation_id = conversations.id
    LEFT JOIN RankedMessages AS user_messages ON user_messages.conversation_id = conversations.id AND user_messages.sender_type = 'user' AND user_messages.row_number = 1
    LEFT JOIN RankedMessages AS ai_messages ON ai_messages.conversation_id = conversations.id AND ai_messages.sender_type = 'ai' AND ai_messages.row_number = 1
    WHERE conversations.user_id = $1
    ORDER BY conversations.start_time DESC;
    `

    try {
        const result = await pool.query(queryText, [userId]);
        return result.rows;
    } catch (err) {
        console.error("Error getting user chat history:", err);
        throw err;
    }
}

async function getConversationLog(conversationId) {
    const queryText = `
        SELECT messages.id, messages.sender_type, messages.content, messages.timestamp
        FROM messages
        WHERE messages.conversation_id = $1
        ORDER BY messages.timestamp ASC;
    `

    try {
        const result = await pool.query(queryText, [conversationId]);
        return result.rows;
    } catch (err) {
        console.error("Error getting conversation log:", err);
        throw err;
    }
}

async function addUserFeedback(userId, conversationId, rating) {
  const client = await pool.connect();
  try {
      await client.query('BEGIN');

      // Check if feedback already exists for specific conversation_id
      const checkQuery = `
          SELECT * FROM user_feedback
          WHERE conversation_id = $1 AND user_id = $2
      `;
      const checkResult = await client.query(checkQuery, [conversationId, userId]);

      let queryText;
      let params;

      if (checkResult.rows.length > 0) {
          // Update existing feedback if the conversation_id already exists in the user_feedback table
          queryText = `
              UPDATE user_feedback
              SET rating = $3, updated_at = NOW()
              WHERE conversation_id = $1 AND user_id = $2
              RETURNING *
          `;
      } else {
          // Insert new feedback if the conversation_id doesn't exist in the user_feedback table
          queryText = `
              INSERT INTO user_feedback (conversation_id, user_id, rating, created_at)
              VALUES ($1, $2, $3, NOW())
              RETURNING *
          `;
      }
      params = [conversationId, userId, rating];

      const result = await client.query(queryText, params);
      await client.query('COMMIT');
      return result.rows[0];
  } catch (err) {
      await client.query('ROLLBACK');
      console.error("Error adding/updating user feedback:", err);
      throw err;
  } finally {
      client.release();
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
    endConversation,
    getConversationLog
}
