const vinValidator = require("vin-validator");
const Cars = require("./cars-model");

const checkCarId = async (req, res, next) => {
  const id = req.params.id;

  try {
    const car = await Cars.getById(id);
    if (car) {
      req.car = car;
      next();
    } else {
      res.status(404).json({ message: `car with id ${id} is not found` });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const car = req.body;
  const requiredFields = ["vin", "make", "model", "mileage"];
  let missingField;

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (car[field] === undefined) {
      missingField = field;
      break;
    }
  }

  if (missingField) {
    res.status(400).json({ message: `${missingField} is missing` });
  } else {
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const vin = req.body.vin;

  if (vinValidator.validate(vin)) {
    next();
  } else {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const vin = req.body.vin;

  try {
    const car = await Cars.getByVin(vin);
    if (!car) {
      next();
    } else {
      res.status(400).json({ message: `vin ${vin} already exists` });
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
