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
  if (!req.body.vin) return next ({
    status: 400,
    message: 'vin is missing'
  })
  if (!req.body.make) return next ({
    status: 400,
    message: 'make is missing'
  })
  if (!req.body.model) return next ({
    status: 400,
    message: 'model is missing'
  })
  if (!req.body.mileage) return next ({
    status: 400,
    message: 'mileage is missing'
  })
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  // Hangs
  if (vinValidator.validate(req.body.vin)) {
    next()
  } else {
    next({ 
      status: 400, 
      message: `vin ${req.body.vin} is invalid`
     })
  }
  // try {
  //   const isValidVin = vinValidator.validate(req.body.vin.trim())

  //   if (isValidVin === false) {
  //     next({ status: 400, message: `vin ${req.body.vin.trim()} is invalid` })
  //   } else {
  //     next()
  //   }

  // } catch (err) {
  //   next(err)
  // }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  next()
  // try {
  //   const existing = await db('cars').where('vin', req.body.vin.trim()).first()

  //   if (existing) {
  //     next({ status: 400, message: `vin ${req.body.vin.trim()} already exists` })
  //   }

  // } catch (err) {
  //     next(err)
  // }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
