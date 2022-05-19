const Car = require('./cars-model')


const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const car = await Car.getById(req.param)
    if(car) {
      req.car = car
      next()
    }
  } catch(err) {
    res.json({message: err.message})
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin, make, model, mileage, title, transmission } = req.body

  if (vin === undefined || make === undefined || model === undefined || mileage === undefined || title === undefined || transmission === undefined ) {
    res.status(400).json({message: `${req.body} is required`})
  }else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  try {
    const existing = await db('cars')
    .where('vin', req.body.name.trim())
    .first()

    if (existing) {
      next({ status: 400, messae: 'that vin is taken'})
    } else {
      next()
    }
  } catch (err) {
    next(err)
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}