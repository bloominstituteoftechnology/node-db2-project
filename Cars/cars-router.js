const express = require("express");
const db = require("../Data/db-config");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "There was an error retreiving this data",
      });
    });
});

module.exports = router;
