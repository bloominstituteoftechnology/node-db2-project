const db = require("../../data/db-config");
const Car = require("../cars/cars-model");

var vinValidator = require("vin-validator");
// var isValidVin = vinValidator.validate('11111111111111111');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
    if (!car) {
      res.status(404).json({ message: `car with id ${req.params.id} is not found` });
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
  if (vin === undefined) {
    next({ status: 400, message: "vin is missing" });
  }
  if (make === undefined) {
    next({ status: 400, message: "make is missing" });
  }
  if (model === undefined) {
    next({ status: 400, message: "model is missing" });
  }
  if (mileage === undefined) {
    next({ status: 400, message: "mileage is missing" });
  }
  next();
};

const checkVinNumberValid = async (req, res, next) => {
  const isValidVin = await vinValidator.validate(req.body.vin);
  if (isValidVin === false) {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  }
  next();
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await db("cars").where("vin", req.body.vin.trim()).first();

    if (exists) {
      next({ status: 400, message: "vin <vin number> already exists" });
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
