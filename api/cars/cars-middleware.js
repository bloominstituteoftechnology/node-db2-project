const db = require('../../data/db-config')
const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const car = await Cars.getById(req.params.id)
    if (car) {
      req.car = car
      next()
    } else {
      next({
        status: 404,
        message: `The car with the specified id of ${req.params.id} is not found`,
      })
    }
  } catch (error) {
    next(error)
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage } = req.body
  if (!vin) {
    next({
      status: 404,
      message: 'The VIN is missing'
    })
  } else if (!make) {
    next({
      status: 404,
      message: 'The make of the vehicle is missing'
    })
  } else if (!model) {
    next({
      status: 404,
      message: 'The model of the vehicle is missing'
    })
  } else if (!mileage) {
    next({
      status: 404,
      message: 'The mileage of the is missing'
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isVinValid = vinValidator(req.body.vin)
  if (isVinValid) {
    next()
  } else {
    next({
      status: 400,
      message: `The VIN ${req.body.vin} is not a valid VIN`
    })
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body
  const vinMatch = await db('cars').where('name', vin.trim()).first()

  if (vinMatch) {
    next({
      status: 400,
      message: `The VIN ${vin} already exists`
    })
  }
}
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}