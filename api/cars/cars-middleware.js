const cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  const {id} = req.params
  cars.getById(id)
    .then(car => {
      if(!car) {
        res.status(404).json('account not found')
      } else {
        next()
      }
    })
    .catch(err => {
      res.json({ message: err.message })
    })
}

const checkCarPayload = (req, res, next) => {
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
  var isValidVin = vinValidator.validate(req.body.vin)

  if (isValidVin) {
    next()
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid!` })
  }
}

const checkVinNumberUnique = (req, res, next) => {
  db('cars').where({ vin: req.body.vin }).first()
    .then(car => {
      if (!car) {
        next()
      } else {
        res.status(400).json({ message: `vin ${req.body.vin} already exists!` })
      }
    })
    .catch(err => {
      res.json({ message: err.message })
    })
}

module.exports = {
  checkCarId,
  checkVinNumberUnique,
  checkVinNumberValid,
  checkCarPayload
}