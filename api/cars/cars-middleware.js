const Car = require('./cars-model')


const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if (!car) {
      next({ status:404, message: "not found"})
    } else {
      req.car = car
      next()
    }
} catch (err) {
    next(err)
}
}

const checkCarPayload = (req, res, next) => {
  if(!req.body.vin) return next({
    status: 400,
    message: 'vin is missing'
  })
  if(!req.body.make) return next({
    status: 400,
    message: 'make is missing'
  })
  if(!req.body.model) return next({
    status: 400,
    message: 'model is missing'
  })
  if(!req.body.mileage) return next({
    status: 400,
    message: 'mileage is missing'
  })
  next()
}

const checkVinNumberValid = (req, res, next) => {
  next()
}

const checkVinNumberUnique = (req, res, next) => {
  next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}