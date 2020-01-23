const express = require("express");
const knex = require("knex");
const knexConfiguration = {
  client: "sqlite3",
  connection: {
    filename: "./data/dev.sqlite3"
  },
  useNullAsDefault: true
};

const db = knex(knexConfiguration);

const router = express.Router();

router.get("/", (req, res) => {
  db.select("*")
    .from("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({ errorMessage: "Error getting the cars. " });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(ids => {
      const id = ids[0]
      db("cars")
        .select("id", "VIN", "make", "model", "mileage", "transmission", "title_status")
        .where({ id })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "Failed to add a car" });
    });
});

module.exports = router;
