const Car = require('./cars-model');
const db = require('../../data/db-config');
var vinValidator = require('vin-validator');
const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id);
     if (!car) {
       next({status: 404, message: `car with id ${req.params.id} is not found`})
     } else {
       req.car = car
     }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = (req, res, next) => {
  const error = {status: 400};
  const {id, vin, make, model, mileage, title, transmission} = req.body;
  if (id === undefined) {
    error.message = 'id is missing'
    next(error) 
} else if (vin === undefined) {
  error.message = 'vin is missing'
  next(error)
} else if (make === undefined) {
  error.message = 'make is missing'
  next(error)
} else if (model === undefined) {
  error.message = 'model is missing'
  next(error)
} else if (mileage === undefined) {
  error.message = 'mileage is missing'
  next(error)
} else if (transmission === undefined) {
  error.message = 'transmission is missing'
  next(error)
} else if (title === undefined) {
  error.message = 'title is missing'
  next(error)
} else {
  next()
}
}
const checkVinNumberValid = (req, res, next) => {
  const validatedVin = vinValidator.validate(req.body.vin)
  if (!validatedVin) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const existing = await db('cars').where('id', req.body.id.trim()).first()
    if (existing) {
      next({status: 400, message: `vin ${req.body.vin} already exists`})
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}
module.exports = {
  checkVinNumberUnique, checkVinNumberValid, checkCarPayload, checkCarId
}