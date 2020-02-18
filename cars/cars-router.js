const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

//GET requests
router.get("/", (req, res) => {
  db.select("*")
    .from("cars")
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The data could not be retrieved." });
    });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .first()
    .then(car => {
      if (car) {
        res.status(200).json(car);
      } else {
        res.status(404).json({
          errorMessage: "The car with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "The data could not be retrieved." });
    });
});

//POST requests
router.post("/", (req, res) => {
  if (!req.body.make || !req.body.model || !req.body.vin || !req.body.mileage) {
    res.status(400).json({
      errorMessage:
        "Please provide the make, model, vin, and mileage for the car."
    });
  } else {
    db("cars")
      .insert(req.body, "id")
      .then(car => {
        res.status(201).json(car);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          errorMessage: "The car could not be added to the database."
        });
      });
  }
});

//PUT requests
router.put("/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .update(req.body)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({
          errorMessage: "The car with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The data could not be updated." });
    });
});

//DELETE requests
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  db("cars")
    .where({ id })
    .del()
    .then(count => {
      if (!count) {
        res.status(404).json({
          errorMessage: "The car with the specified ID does not exist."
        });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "The data could not be removed." });
    });
});

module.exports = router;
