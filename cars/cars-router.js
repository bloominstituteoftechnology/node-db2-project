const express = require("express");
const router = express.Router();
const db = require("../data/dbconfig");

router.get("/cars", async (req, res) => {
  db("cars")
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => res.status(500).send());
});

router.get("/cars/:id", async (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .then((results) => res.status(200).json(results))
    .catch((err) => res.status(500).send());
});

router.post("/cars", async (req, res) => {
  db("cars")
    .insert(req.body)
    .then((results) => res.status(201).send())
    .catch((err) => res.status(500).send());
});
