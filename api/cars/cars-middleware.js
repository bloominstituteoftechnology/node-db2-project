const Car = require("./cars-model.js");
const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const car = await Car.getById(id);
    if (!car) {
      res.status(404).json({ message: `car with id: ${id} is not found` });
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  if (!vin || !make || !model || !mileage) {
    res
      .status(400)
      .json({ message: "Vin, make, model, and mileage are required" });
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
};

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
