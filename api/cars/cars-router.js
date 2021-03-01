// DO YOUR MAGIC
const express = require("express");

const database = require("./cars-model");

const router = express.Router();

router.get("/", (req, res) => {
    database
      .get()
      .then((cars) => {
        res.status(200).json(cars);
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "The cars information could not be retrieved" });
      });
  });

    //get
router.get("/:id", (req, res) => {
    const car = req.body;
    database
      .findById(car.id)
      .then((car) => {
        if (car === null) {
          res
            .status(404)
            .json({ message: "The action with the specified ID does not exist" });
        }
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: "The action information could not be retrieved" });
      });
  });

  //post
router.post("/", (req, res) => {
    const car = req.body;
    console.log(req.body);
    if (car === undefined || car.id === undefined || car.vin === undefined || car.make === undefined || car.model === undefined || car.mileage === undefined) {
      res
        .status(400)
        .json({ message: "Please provide car id for the action" });
    } else {
      database
        .insert(cars)
        .then((newCar) => {
          res.status(201).json(newCar);
        })
        .catch((error) => {
          res.status(500).json({
            message: "There was an error while saving the project to the database",
          });
        });
    }
  });