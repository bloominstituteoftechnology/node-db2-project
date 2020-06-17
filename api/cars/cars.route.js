const express = require("express");
const { getAllCars, createCar } = require("./cars.controller");

const carsRouter = express.Router();

carsRouter.get("/", getAllCars);
carsRouter.post("/", createCar);

module.exports = carsRouter;
