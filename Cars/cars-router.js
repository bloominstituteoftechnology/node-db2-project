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

router.put("/:id", (req, res) => {
  const { id } = req.params;

  const updateCar = {
    vin: req.body.vin,
    year: req.body.year,
    make: req.body.make,
    model: req.body.model,
    mileage: req.body.mileage,
    price: req.body.price,
    color: req.body.color,
  };

  db("cars")
    .where({ id })
    .update(updateCar)
    .then((cars) => {
      res.status(200).json(cars).json({
        message: "Information has been updated!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        errorMessage: "This data could not be updated",
      });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .del()
    .then((cars) => {
      res.status(204);
    })
    .catch((err) => {
      errorMessage: "This data could not be deleted";
    });
});

module.exports = router;
