const Car = require('./cars-model')

const checkCarId = async (req, res, next) => {
    try {
      const car = await Car.getById(req.params.id)
      if (!car) {
        next({status: 404, message: 'not found'})
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