const Cars = require('./cars-model')
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  try {
    const carIdCheck = await Cars.getById(req.params.id)
    if(carIdCheck) {
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
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
 checkCarId,
 checkCarPayload,
 checkVinNumberValid,
 checkVinNumberUnique,
}