const db = require('../../data/db-config.js')
const vinValidator = require('vin-validator')
const Cars = require('./cars-model.js')

const checkCarId = async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id)
    if (car) {
      req.car = car
      next()
    } else {
      res.status(404)
        .json({ message: `car with id ${req.params.id} is not found` })
    }
  } catch (err) {
    next(err)
  }
}

const checkVinNumberValid = async (req, res, next) => {
  try {
    const validVin = vinValidator.validate(req.body.vin)
    if ( ! validVin) {
      res.status(400)
        .json({ message: 'vin must be 17 characters long' })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body
    const taken = await db('cars')
      .where('vin', vin.trim())
      .first()
    if (taken) {
      res.status(400)
        .json({ message: `vin ${vin} already exists` })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = async (req, res, next) => {
  try {
    const { vin, make, model, mileage } = req.body
    
    if ( ! vin || ! make || ! model || ! mileage) {
      res.status(400)
        .json({ message: 'vin, make, model, and mileage are required' })
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique,
}
