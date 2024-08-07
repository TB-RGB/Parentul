const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:id", (req, res) => {
  const queryText = `
  SELECT * FROM "user_preferences"
  WHERE user_id = $1;
  `;

  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error with get preferences route");

      res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
  const queryText = `
  INSERT INTO "user_preferences"("user_id")
  VALUES ($1);
  `;

  const insertQuery = [req.body.userId];
  pool
    .query(queryText, insertQuery)
    .then((result) => {
      res.sendStatus(201);
    })

    .catch((err) => {
      console.log("Error with Post preferences", err);
      res.sendStatus(500);
    });
});

router.put("/:id", (req, res) => {
  let updateId = req.params.id;
  console.log(
    "Updating preferences for user:",
    updateId,
    "with data:",
    req.body
  );

  const queryText = `
  UPDATE "user_preferences"
  SET 
    "notifications_email" = $1,
    "notifications_sms" = $2,
    "phone_number" = $5,
    "notifications_freq" = $3,
    "updated_at" = NOW()
  WHERE 
    user_id = $4;
  `;

  const updatedPreferences = [
    req.body.notifications_email,
    req.body.notifications_sms,
    req.body.notifications_freq,
    updateId,
    req.body.phone_number,
  ];

  pool
    .query(queryText, updatedPreferences)
    .then((result) => {
      console.log("Preferences updated successfully");
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("Error with the put route", err);
      res.sendStatus(500);
    });
});

module.exports = router;
