const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here



  const queryText = `SELECT * FROM "children";`

  pool.query(queryText)
    .then(result => {
      res.send(result.rows);

    })
    .catch(err => {

      console.log("error with get all children route")

      res.sendStatus(500)
    })



});

//route will return all children associated with a specific user_id
//specifically all children belonging to a family will be returned
router.get('/:user_id', (req, res) => {
  // GET route code here

  
  let childdataid =  req.body.user_id
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
 */
router.post('/', (req, res) => {
  // POST route code here

  const queryText = `
  INSERT INTO "children"  
  
      ("user_id", "name", "dob")
      VALUES
    ($1, $2, $3);
  `


  //array which contains the user prefrences from req.body 
  //this array will contain 5 parameters reflecting the number of values
  //in queryText 

  const insertQuery = [
    
    req.body.user_id,
    req.body.name,
   
    req.body.dob
    
   

  ]

  //request to the postgres server which will update userprefrences
  pool.query(queryText, insertQuery)
  .then((result)=> {res.sendStatus(201);})

  .catch((err) => {
    console.log('Error with Post preferences', err);
    res.sendStatus(500);
  });
});





//this route will update by 
router.put('/:id', (req, res) => {
  // PUT route code here

  //update id is derived from req.params.id
  let updateid = req.params.id


  //the text which will update a specific entry in the database 
  const queryText = `
  UPDATE "children"
  SET 
  
  "user_id" = $1,
  "name" = $2,
  "dob" = $3
  

  WHERE 
  id = $4;
  `

  const updatedpreferences = [
   
    req.body.user_id,
    
    req.body.name,
    req.body.dob,
    
    updateid

  ]

  pool.query(queryText, updatedpreferences)
  .then((result)=> {res.sendStatus(200); })
  .catch((err)=>{
    console.log('Error with the put route');
    res.sendStatus(500);
  })
});

module.exports = router;
