const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .select("*")
    .then(carData => {
      res.status(200).json(carData);
    })
    .catch(err => {
      res.status(500).json({
        Message: "Problem with the database. "
      });
    });
});

router.post("/", (req, res) => {});

module.exports = router;
