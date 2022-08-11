const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");

router.get("/", (req, res) => {
  console.log("user.id logged in: ", req.user.id);

  const queryText = `SELECT * FROM "drool_list" WHERE "user_id" = $1 ORDER BY id;`;
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
    console.log('this is req.body in favorites post', req.body);
  
    const restaurant_name = req.body[0];
    const location = req.body[1] + ',' + req.body[2];
    const current_user = req.user.id;
  
    console.log('this is location', location);
    try {
      await client.query("BEGIN");
      const favoriteResults = await client.query(
        `INSERT INTO "drool_list" ("restr_name", "place_location", "user_id")
          VALUES ($1, $2, $3)
          RETURNING id;`,
        [restaurant_name, location, current_user]
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

router.delete("/:restaurantName", (req, res) => {
  console.log('in drool delete, req.params:', req.params);

  const queryText = `DELETE FROM "drool_list" WHERE "restr_name" = $1;`;
  pool
    .query(queryText, [req.params.restaurantName])
    .then(function (response) {
      res.sendStatus(200);
    })
    .catch(function (error) {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;