const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");

// This route *should* return the API's data
router.get("/", (req, res) => {
  console.log("user.id logged in: ", req.user.id);

  const queryText = `SELECT * FROM "favorites" WHERE "user_id" = $1;`;
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

router.post("/", async (req, res) => {
  const client = await pool.connect();
  console.log('this is req.body', req.body);

  const restaurant_name = req.body[0];
  const photos_url = req.body[1];
  const currentUser = req.user.id;

  try {
    await client.query("BEGIN");
    const favoriteResults = await client.query(
      `INSERT INTO "favorites" ("restr_name", "photos_url", "user_id")
        VALUES ($1, $2, $3)
        RETURNING id;`,
      [restaurant_name, photos_url, currentUser]
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

module.exports = router;
