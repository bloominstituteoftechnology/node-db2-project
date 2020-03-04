const express = require("express");
const router = express.Router();
const db = require("./data/config");

router.get("/", async (req, res, next) => {
  try {
    const cars = await db("cars");
    res.json(cars);
  } 
  catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {  
    const cars = await db("cars").where({ id }).first();
    res.status(200).json(cars);
  } 
  catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const carData = req.body;

  try {
    if (!req.body) {
      return res.status(400).json({
        message: "Please include the car's information."
      });
    }
    const [id] = await db("cars").insert(carData);
    const newCar = await db("cars").where({ id });
    res.status(201).json(newCar);
  } 
  catch (err) {
    next(err);
  }
});

module.exports = router;
