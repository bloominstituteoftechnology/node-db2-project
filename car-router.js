const express = require("express");

const db = require("./data/db-config");

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(car => res.json(car))
    .catch(err =>
      res.status(500).json({ message: "Could not get cars", error: err })
    );
});

router.post("/", (req, res) => {
  const carBody = req.body;

  db("cars")
    .insert(carBody)
    .then(car => res.status(201).json(car))
    .catch(err =>
      res.status(500).json({ message: "Could not make new entry", error: err })
    );
});

module.exports = router;
