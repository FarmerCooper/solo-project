const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');

// This route *should* return the API's data
router.get('/:address', (req, res) => {

    console.log('This is req.params', req.params);
  const address = req.params;

    let config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.PLACES_API_KEY}`,
        headers: {}
      };

      axios(config)
      .then(function (response) {
        // console.log('this is what JSON.stringy(response.data) is:', (response.data));
        res.send(response.data)
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

module.exports = router;