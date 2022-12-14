const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");

// This route returns user restaurant favorites
router.get("/", (req, res) => {
  // console.log("user.id logged in: ", req.user.id);

  const queryText = `SELECT * FROM "favorites" WHERE "user_id" = $1 ORDER BY id;`;
  pool
    .query(queryText, [req.user.id])
    .then(function (result) {
      res.send(result.rows);
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
});

// Updates favorites data
router.post("/", async (req, res) => {
  const client = await pool.connect();
  // console.log('this is req.body in favorites post', req.body);

  const restaurant_name = req.body[0];
  const photos_url = req.body[1];
  const place_id = req.body[2];
  // Combines latitude and longitude into one object 
  const location = req.body[3] + ',' + req.body[4];
  const currentUser = req.user.id;

  // console.log('this is location', location);
  try {
    await client.query("BEGIN");
    const favoriteResults = await client.query(
      `INSERT INTO "favorites" ("restr_name", "photos_url", "place_location", "user_id", "place_id")
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id;`,
      [restaurant_name, photos_url, location, currentUser, place_id]
    );
    const clientId = favoriteResults.rows[0].id;

    await client.query("COMMIT");
    res.sendStatus(201);
  } catch (error) {
    await client.query("ROLLBACK");
    console.log("Error POST /api/feedback", error);
    res.sendStatus(500);
  } finally {
    client.release();
  }
});

// Updates the rating according to user's input
router.put("/", (req, res) => {
    // console.log('this is req.body', req.body);
    
    const inputRating = req.body.rating;
    const place_id = req.body.place_id;
  
    const queryText = `UPDATE "favorites" SET "user_rating" = $1 WHERE place_id = $2;`;
    pool
      .query(queryText, [inputRating, place_id])
      .then(function (response) {
        res.sendStatus(200);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

// Deletes favorite restaurant
router.delete("/:placeId", (req, res) => {
    // console.log('this is req.params', req.params);
    // console.log("this is req.params.placeId ", req.params.placeId);
  
    const queryText = `DELETE FROM "favorites" WHERE "place_id" = $1 AND "user_id" = $2;`;
    pool
      .query(queryText, [req.params.placeId, req.user.id])
      .then(function (response) {
        res.sendStatus(200);
      })
      .catch(function (error) {
        console.log(error);
        res.sendStatus(500);
      });
});

module.exports = router;
