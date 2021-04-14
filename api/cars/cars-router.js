const express = require("express");
const Cars = require("./cars-model");
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

const router = express.Router();

router.get("/", (req, res, next) => {
  Cars.getAll()
    .then((cars) => res.status(200).json(cars))
    .catch((err) => next(err));
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  (req, res, next) => {
    Cars.create(req.body)
      .then((car) => {
        res.status(201).json(car);
      })
      .catch((err) => next(err));
  }
);

router.use((err, req, res) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;
