const express = require("express");

// database access using knex
const db = require("../carConfig.js");

const router = express.Router();

router.post("/", (req, res) => {
  db("cars");
  db.insert(req.body)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      console.log(error);

      res.status(500).json({ error: " error adding cars to data base" });
    });
});

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      caonsole.log(error);

      res.status(500).json({ error: "error retreving cars" });
    });
});

module.exports = router;
