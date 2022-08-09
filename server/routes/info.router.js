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
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?keyword=restaurant&location=${latitude}%2C${longitude}&radius=300&type=restaurant&key=${process.env.PLACES_API_KEY}`,
        headers: {}
      };

      axios(config)
      .then(function (response) {
        res.send(response.data)
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

router.post('/', async (req, res) => {
  const client = await pool.connect();
  // console.log('This is req.body.geometry.location', req.body.geometry.location);
  const restaurant_name = req.body.name;
  const photos_reference = req.body.photos[0].photo_reference;
  const rating = req.body.rating;
  const ratings_total = req.body.user_ratings_total;
  const prominence = Number(Math.round(req.body.user_ratings_total / req.body.rating));
  const location = req.body.geometry.location;
  const place_id = req.body.place_id;
  try {
      await client.query('BEGIN')
      const feedbackInsertResults = await client.query(`INSERT INTO "Downtown_Core_Old" ("name", "rating", "user_ratings_count", "prominence", "photos_reference", "place_location", "place_id")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id;`, [
        restaurant_name,
        rating,
        ratings_total,
        prominence,
        photos_reference,
        location,
        place_id
      ]);
      const clientId = feedbackInsertResults.rows[0].id;

      await client.query('COMMIT')
      res.sendStatus(201);
  } catch (error) {
      await client.query('ROLLBACK')
      console.log('Error POST /api/feedback', error);
      res.sendStatus(500);
  } finally {
      client.release()
  }
});

module.exports = router;
