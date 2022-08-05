const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');
require('isomorphic-fetch');


// This route *should* return the API's data
router.get('/:photo_reference', (req, res) => {
    const photoReference = req.params.photo_reference
    
    let config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=250&photo_reference=${photoReference}&key=${process.env.PLACES_API_KEY}`,
        headers: {},
        responseType: 'blob'
      };

      axios(config)
      .then(function (response) {
        // console.log(`this is what we're sending:`, response);
        if (response.request.res.responseUrl !== undefined || response.request.res.responseUrl !== 0) {
          res.send(response.request.res.responseUrl);
        }
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

module.exports = router;