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

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .then((cars) => {
      res.status(200).json(cars);
    })
    .catch((err) => {
      errorMessage: "The selected data could not be retrieved";
    });
});

router.post("/", (req, res) => {
  const newCar = {
    vin: req.body.vin,
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    mileage: req.body.mileage,
    price: req.body.price,
    color: req.body.color,
  };

  db("cars")
    .insert(newCar)
    .then((cars) => {
      res.status(201).json(cars);
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "The new entry could not be created",
      });
    });
});

module.exports = router;
