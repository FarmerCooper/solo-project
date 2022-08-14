const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const axios = require('axios');
require('isomorphic-fetch');


// This route returns the photo given a photo reference
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

// Updates the URL into the DB
router.put('/', (req, res) => {
    // console.log('this is req.params', req.body);
    // console.log('this is req.params.url', req.body.url);
    // console.log('this is req.params.place_id', req.body.placeId);
  
    const newUrl = req.body.url;
    const place_id = req.body.placeId;
        
        const queryText = `UPDATE "Downtown_Core_Old" SET "photos_url" = $1 WHERE "place_id" = $2;`;
        pool.query(queryText, [newUrl, place_id])
          .then((result) => {
            res.sendStatus(200);
          })
          .catch((error) => {
            console.log('Error POST /api/feedback', error);
            res.sendStatus(500);
          })
});

module.exports = router;