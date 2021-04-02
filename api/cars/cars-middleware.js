const cars = require('./cars-model.js')
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const car = await cars.getById(req.params.id)
  if (!car) {
    res.status(404).json({ message: `car with id ${req.params.id} is not found` })
  } else {
    req.car = car;
    next()
  }
}


const checkCarPayload = (req, res, next) => {
  if (!req.body.vin) {
    res.status(400).json({ message: `VIN is missing` })
} else if (!req.body.make) {
  res.status(400).json({ message: `Make is missing` })
} else if (!req.body.model) {
  res.status(400).json({ message: `Model is missing` })
} else if (!req.body.mileage) {
  res.status(400).json({ message: `Mileage is missing` })
} else if (!req.body.title) {
  res.status(400).json({ message: `Title is missing` })
} else if (!req.body.transmission) {
  res.status(400).json({ message: `Transmission is missing` })
} else {
  req.body.name = req.body.name.trim()
  next();
}
}


const checkVinNumberValid = async (req, res, next) => {
  let validVin = vinValidator.validate(req.body.vin)
  if (!validVin) {
    res.status(400).json({ message: `VIN ${req.body.vin} is invalid` })
  } else {
    next();
  }
}

const checkVinNumberUnique = (req, res, next) => {
  if (req.body.vin) {
    res.status(400).json({ message: `VIN ${req.body.vin} already exists` })
  } else {
    next();
  }
}



module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}