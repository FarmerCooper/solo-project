const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");

router.get("/", (req, res) => {
  const queryText =
    'SELECT * FROM "Downtown_Core_Old" ORDER BY "prominence" DESC;';
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error POST /api/feedback", error);
      res.sendStatus(500);
    });
});

router.post("/", async (req, res) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(`TRUNCATE "Downtown_Core_Old";`);
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
