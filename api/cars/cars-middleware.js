const Car = require('./cars-model')
var vinValidator = require('vin-validator');
// const db = require('../../data/db-config')


const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  console.log('verifying id')
  const { id } = req.params;
  Car.getById(id)
    .then(foundCar => {
      if (!foundCar) {
        res.status(404).json({ message: `car with id ${id} is not found` })
      }
      else {
        next()
      }
    })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    res.status(400).json({ message: 'vin is missing!' })
  } else if (!req.body.make) {
    res.status(400).json({ message: 'make is missing!' })
  } else if (!req.body.model) {
    res.status(400).json({ message: 'model is missing!' })
  } else if (!req.body.mileage) {
    res.status(400).json({ message: 'mileage is missing!' })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  let isVinValid = vinValidator.validate(req.body.vin);
  if (!isVinValid) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` })
  }
  else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  Car.checkVinUnique(req.body.vin)
    .then(response => {
      if (response) {
        res.status(400).json({ message: `vin ${req.body.vin} already exists` })
      }
      else {
        next()
      }
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })

}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
