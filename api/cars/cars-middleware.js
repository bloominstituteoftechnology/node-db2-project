const Cars = require('./cars-model');
const vinValidate = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;

  const car = await Cars.getById(id);
  if (car) {
    next();
  } else {
      res.status(404).json({ message: `car with id ${id} is not found` });
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const car = req.body;

  if (!car.vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!car.make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!car.model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!car.mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.body;
  const validVin = vinValidate.validate(vin);

  if (!validVin) {
    res.status(400).json({ message: `vin ${vin} is invalid` });
  } else {
    next();
  }

}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const {vin} = req.body;

  const oldVin = await Cars.getAll();
  if (oldVin.includes(vin)) {
    res.status(400).json({ message: `vin ${vin} already exists` });
  } else {
    next();
  }
}

module.exports = {checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique};