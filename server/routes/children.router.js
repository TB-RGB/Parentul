const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();




//route will return all children associated with a specific user_id
//specifically all children belonging to a family will be returned
router.get('/:user_id', (req, res) => {
  // GET route code here


  let childdataid = req.body.user_id
  const queryText = `SELECT *
                      FROM children
                      where user_id = $1;`

  pool.query(queryText, [childdataid])
    .then(result => {
      res.send(result.rows);

    })
    .catch(err => {

      console.log("error with get child by user_id route")

      res.sendStatus(500)
    })



});

/**
 * POST route template
 * This template reflects a SQL Transaction
 */
/**
 * POST route for adding one or multiple children
 */
router.post('/', async (req, res) => {
  const connection = await pool.connect();

  try {
    await connection.query('BEGIN');

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

    await connection.query('COMMIT');

    res.status(201).json(results);
  } catch (error) {
    await connection.query('ROLLBACK');
    console.error('Error adding child(ren):', error);
    res.status(500).json({ error: 'Failed to add child(ren)' });
  } finally {
    connection.release();
  }
});

router.get('/family/:user_id', async (req, res) => {
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
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching family data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  //array which contains the user prefrences from req.body 
  //this array will contain 5 parameters reflecting the number of values
  //in queryText 


  //request to the postgres server which will update userprefrences










//this route needs to be written as a SQL Transaction 
//IF two children are 
//Never chage the user_id in the put route
//always update by 
//always will relate user_id


//ASYNC\


//begibn

//commit 

//rollback

router.put('/update', async (req, res) => {
  // PUT route code here

  const connection = await pool.connect()



  try {

    await connection.query('BEGIN');

    let children = req.body  // [{name, dob, child_id},{}]

    let queryText = ` UPDATE "children"
  SET 
  
 
  "name" = $1,
  "dob" = $2
  

  WHERE 
  id = $3;`

    //inserts to database
    for (let child of children) {

      await connection.query(queryText, [child.name, child.dob, child.child_id])
    }

    connection.query('COMMIT')

    res.sendStatus(200)
    //commit 
  }

  catch (error) {
    await connection.query('ROLLBACK');
    console.log(error);
    res.sendStatus(500);
  }

  finally {

    connection.release()
  }
  //the text which will update a specific entry in the database 

});

module.exports = router;
