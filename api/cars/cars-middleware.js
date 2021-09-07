const Car = require('./cars-model')
const db = require('../../data/db-config')
const vinValidator = require('vin-validator') // to be used in checkVinNumberValid

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Car.getById(req.params.id)
    if (!car) {
      next({ status: 404, message: `car with id ${req.params.id} is not found` })
    } else {
      req.car = car
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const isValidVin = vinValidator.validate(req.body.vin.trim())

    if (!isValidVin) {
      next({ status: 400, message: `vin ${req.body.vin.trim()} is invalid` })
    } else {
      next()
    }

  } catch (err) {
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await db('cars').where('vin', req.body.vin.trim()).first()

    if (existing) {
      next({ status: 400, message: `vin ${req.body.vin.trim()} already exists` })
    }

  } catch (err) {
      next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
