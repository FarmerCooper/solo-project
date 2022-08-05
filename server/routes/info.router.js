const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');


// This route *should* return the API's data
router.get('/:coordinates', (req, res) => {
  console.log('this is req.', req.params);

  let myArray = req.params.coordinates.split(/[, ]+/);
  console.log('this is my array at 0', myArray[0])

    const latitude = myArray[0];
    const longitude = myArray[1];


  console.log('this is latitude', latitude)

    let config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=${latitude}%2C${longitude}&radius=50&type=restaurant&key=${process.env.PLACES_API_KEY}`,
        headers: {}
      };

      axios(config)
      .then(function (response) {
        console.log('this is what JSON.stringy(response.data) is:', (response.data));
        res.send(response.data)
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
