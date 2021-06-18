// DO YOUR MAGIC
const express = require("express");
const Car = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Car.getAll()
    .then((cars) => {
      // console.log('cars', cars);
      res.status(200).json(cars);
    })
    .catch((err) => {
      //     console.error('err', err);
      next(err);
    });
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.car);
});
//[POST] /api/cars` returns the created car.

router.post(
  "/",
//   checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Car.create(req.body);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;