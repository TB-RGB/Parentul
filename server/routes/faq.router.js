const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();





/**
 * GET route template
 */
router.get('/', (req, res) => {
  
  const queryText = `SELECT * FROM "faq";`

  pool.query(queryText)
    .then(result => {
      res.send(result.rows);

    })
    .catch(err => {

      console.log("error with get faq route")

      res.sendStatus(500)
    })



});


module.exports = router;
