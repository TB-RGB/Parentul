const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/:user_id", (req, res) => {
  let childdataid = req.body.user_id;
  const queryText = `SELECT *
                      FROM children
                      where user_id = $1;`;

  pool
    .query(queryText, [childdataid])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("error with get child by user_id route");

      res.sendStatus(500);
    });
});

router.post("/", async (req, res) => {
  const connection = await pool.connect();

  try {
    await connection.query("BEGIN");

    const children = Array.isArray(req.body) ? req.body : [req.body];

    const queryText = `
      INSERT INTO "children"  
      ("user_id", "name", "dob")
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    const results = [];

    for (let child of children) {
      const { user_id, name, dob } = child;
      const result = await connection.query(queryText, [user_id, name, dob]);
      results.push(result.rows[0]);
    }

    await connection.query("COMMIT");

    res.status(201).json(results);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.error("Error adding child(ren):", error);
    res.status(500).json({ error: "Failed to add child(ren)" });
  } finally {
    connection.release();
  }
});

router.get("/family/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const queryText = `
   SELECT
    users.id,
    users.first_name AS parent_first_name,
    users.last_name AS parent_last_name,
    COALESCE(json_agg(
        json_build_object(
            'id', children.id,
            'name', children.name,
            'dob', children.dob
        ) ORDER BY children.id
    ) FILTER (WHERE children.id IS NOT NULL), '[]'::json) AS children
FROM
    users
JOIN
    children ON children.user_id = users.id
WHERE
    users.id = $1
GROUP BY
    users.id, users.first_name, users.last_name;
  `;

  try {
    const result = await pool.query(queryText, [user_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching family data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/update", async (req, res) => {
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const { children } = req.body;

    for (let child of children) {
      const queryText = `
        UPDATE "children"
        SET "name" = $1, "dob" = $2
        WHERE "id" = $3 AND "user_id" = $4
      `;
      await connection.query(queryText, [
        child.name,
        child.dob,
        child.id,
        child.user_id,
      ]);
    }

    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log("Error updating children:", error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.put("/update-user", async (req, res) => {
  const connection = await pool.connect();
  try {
    const { id, first_name, last_name } = req.body;

    const queryText = `
      UPDATE "users"
      SET "first_name" = $1, "last_name" = $2
      WHERE "id" = $3
      RETURNING id, first_name, last_name;
    `;

    const result = await connection.query(queryText, [
      first_name,
      last_name,
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.log("Error updating user:", error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

router.delete("/:childId", async (req, res) => {
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const { childId } = req.params;
    const userId = req.user.id;

    const deleteQuery = `
      DELETE FROM "children"
      WHERE "id" = $1 AND "user_id" = $2
    `;

    const result = await connection.query(deleteQuery, [childId, userId]);

    if (result.rowCount === 0) {
      throw new Error("Child not found or user not authorized");
    }

    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.error("Error deleting child:", error);
    res.status(500).json({ message: "Failed to delete child" });
  } finally {
    connection.release();
  }
});
module.exports = router;
