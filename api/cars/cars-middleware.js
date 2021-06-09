const Car = require('./cars-model')
const db = require('../../data/db-config')


exports.checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Car.getById(req.params.id)
    if(!car) {
      next({ status: 404, message: `car with id ${req.params.id}`})
    } else {
      req.car = carnext()
    } 
  } catch (err) {
    next(err)
  }
}

exports.checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const error = { status: 400 }
  const { vin, make, model, mileage } = req.body
  if( !vin || !make || !model || !mileage ) {
    error.message = `${req.body} is missing`
    next(error)
  } else {
    next()
  }
}

exports.checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const error = { status: 400 }
  const { vin } = req.body
  if( vin === undefined || typeof vin !== 'string' ) {
    error.message = ` vin ${vin} is invalid`
    next(error)
  } else {
    next()
  }
}

exports.checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const takenVin = await db('cars')
      .where('vin', req.body.vin.trim())
      .first()
    if( takenVin ) {
      next({ status: 400, message: `vin ${vin} already exists`})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}
