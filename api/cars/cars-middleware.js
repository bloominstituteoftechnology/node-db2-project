const Cars = require('./cars-model')
const db = require('../../data/db-config')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try {
    const carIdCheck = await Cars.getById(req.params.id)
    if (carIdCheck) {
      req.car = carIdCheck
      next()
    } else {
      res.status(404).json({
        message: `car with id ${req.params.id} is not found`
      })
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if (!vin) {
    res.status(400).json({
      message: `vin is missing`
    })
  } else if (!make) {
    res.status(400).json({
      message: `make is missing`
    })
  } else if (!model) {
    res.status(400).json({
      message: `model is missing`
    })
  } else if (!mileage) {
    res.status(400).json({
      message: `mileage is missing`
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if (vinValidator.validate(req.body.vin)) {
    next()
  } else {
    res.status(400).json({
      message: `vin ${req.body.vin} is invalid`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const exisiting = await db('cars')
    .where('vin', req.body.vin)
    .first()

  if (!exisiting) {
    next()
  } else {
    res.status(400).json({
      message: `vin ${req.body.vin} already exists`
    })
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}