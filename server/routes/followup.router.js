const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// ? Route to post followup after feedback

router.post("/", (req, res) => {
  const { conversationId, userId, questionText } = req.body;
  const queryText = `
    INSERT INTO follow_ups (conversation_id, user_id, question_text)
    VALUES ($1, $2, $3);
    `;

  pool
    .query(queryText, [conversationId, userId, questionText])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error("Error adding followup:", err);
      res.sendStatus(500);
    });
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
