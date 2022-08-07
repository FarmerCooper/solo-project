const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');

// This route *should* return the API's data
router.get('/', (req, res) => {
    console.log('user.id logged in: ', req.user.id)
    
    const queryText = `SELECT * FROM "favorites" WHERE "user_id" = $1;`;
    pool.query(queryText, [req.user.id])
      .then(function (result) {
        res.send(result.rows)
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

module.exports = router;