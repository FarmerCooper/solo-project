const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const axios = require("axios");

router.get("/:photo_reference", (req, res) => {
  const queryText = 'SELECT * FROM "solo";';
  pool
    .query(queryText)
    .then((result) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log("Error POST /api/feedback", error);
      res.sendStatus(500);
    });
});

module.exports = router;
