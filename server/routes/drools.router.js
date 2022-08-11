const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");

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

module.exports = router;