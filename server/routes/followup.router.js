const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const { scheduleNotification } = require("../services/notification.scheduler");

// ? Route to post followup after feedback

router.post("/", async (req, res) => {
  const { conversationId, userId, questionText } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Check if a follow-up record already exists for this conversation
    const checkQuery = `
      SELECT * FROM follow_ups
      WHERE conversation_id = $1 AND user_id = $2
    `;
    const checkResult = await client.query(checkQuery, [
      conversationId,
      userId,
    ]);

    if (checkResult.rows.length > 0) {
      if (checkResult.rows[0].is_asked) {
        await client.query("ROLLBACK");
        return res.status(400).json({
          error: "This conversation has already been flagged for follow-up.",
          showSnackbar: true,
        });
      }
    } else {
      const insertQuery = `
        INSERT INTO follow_ups (conversation_id, user_id, question_text, is_asked, created_at)
        VALUES ($1, $2, $3, true, NOW())
        RETURNING *
      `;
      await client.query(insertQuery, [conversationId, userId, questionText]);
    }

    // Fetch the conversation log
    const logQuery = `
      SELECT * FROM messages
      WHERE conversation_id = $1
      ORDER BY timestamp ASC
    `;
    const logResult = await client.query(logQuery, [conversationId]);
    const conversationLog = logResult.rows;

    // Schedule the notification with the conversation log
    await scheduleNotification(userId, conversationId, conversationLog);

    await client.query("COMMIT");
    res
      .status(200)
      .json({ message: "Follow-up recorded and notification scheduled" });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error adding/updating follow-up:", err);
    res.status(500).json({
      error: "An error occurred while processing your request.",
      showSnackbar: true,
    });
  } finally {
    client.release();
  }
});

// ? Route to get followup after feedback
router.get("/", (req, res) => {
  const { conversationId } = req.body;
  const queryText = `
    SELECT 
        follow_ups.question_text
    FROM follow_ups
    WHERE conversation_id = $1;
    `;

  pool
    .query(queryText, [conversationId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.error("Error getting followup:", err);
      res.sendStatus(500);
    });
});

module.exports = router;
