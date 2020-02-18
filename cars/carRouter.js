const express = require('express')
const db = require('../data/dbConfig')
// we must select the development object from our knexfile

const router = express.Router();

router.get("/", (req, res) => {
  db("carsManager")
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "failed to retrieve car info" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("carsManager")
    .where({ id })
    .first()
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("carsManager")
    .insert(carData)
    .then(ids => {
      db("carsManager")
        .where({ id: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log("Whoops", err);
      res.status(500).json({ message: "Failed to store new car data" });
    });
});

// export for use in codebase
module.exports = router;
