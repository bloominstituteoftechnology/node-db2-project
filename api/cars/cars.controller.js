const db = require("../../data/db-config.js");

async function getAllCars(req, res) {
  try {
    const cars = await db("cars");
    res.status(200).json(cars);
  } catch (e) {
    res.status(500).json({ message: "unable to get cars" });
  }
}

async function createCar(req, res) {
  const { vin, make, model, mileage } = req.body;

  if (!vin || !make || !model || !mileage) {
    return res
      .status(400)
      .json({ message: "vin, make, model, and mileage required" });
  }

  try {
    const [id] = await db("cars").insert({ vin, make, model, mileage });
    const car = await db("cars").where({ id });
    res.status(201).json(car[0]);
  } catch (e) {
    res.status(500).json({ message: "unable to create car" });
  }
}

module.exports = { getAllCars, createCar };
