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
router.post('/', async (req, res) => {
  // POST route code here

  const connection = await pool.connect()


  try {

    await connection.query('BEGIN');

    //defines children from req.body
    //children contains many different child components 
    //which will be iterated through and added to database
    let children = req.body



    queryText = ` INSERT INTO "children"  
  
      ("user_id", "name", "dob")
      VALUES
    ($1, $2, $3);`

    //inserts to database
    for (let child of children) {

      await connection.query(queryText, [child.user_id, child.name, child.dob])
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



  //array which contains the user prefrences from req.body 
  //this array will contain 5 parameters reflecting the number of values
  //in queryText 


  //request to the postgres server which will update userprefrences




});





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
