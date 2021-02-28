const express = require("express");
const router = express.Router();
const Car = require("./carsModel");

router.get("/", async (req, res, next) => {
  try {
    const data = await Car.find();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = await Car.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const data = await Car.post(body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res) => {
  res.status(500).json({ message: err.message, stack: err.stack });
});

module.exports = router;