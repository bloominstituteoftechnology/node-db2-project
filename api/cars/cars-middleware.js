const Cars = require("./cars-model");

const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const id = req.params.id;
    const car = await Cars.getById(id);
    if (car) {
      req.car = car;
      next();
    } else res.status(404).json({ message: `car with id ${id} is not found` });
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body;

  if (!vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const validVinNumber = vinValidator.validate(req.body.vin);

  if (validVinNumber === false) {
    res.status(400).json({ message: "vin abc is invalid" });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existingAccounts = await Cars.getAll();
    const vin = req.body.vin;

    const result = existingAccounts.find((cars) => {
      if (cars.vin === vin) {
        return cars;
      }
    });
    if (result) {
      res.status(400).json({ message: "vin 11111111111111111 already exists" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
