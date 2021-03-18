const Cars = require('./cars-model')

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  Cars.getById(id)
    .then(car => {
      if (!car) {
        res.status(404).json({message: `car with id ${id} is not found`})
      } else {
        req.car = car;
        next()
      }
    }).catch(err => {
      next(err)
    })

}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make,model,mileage} = req.body;
  if (!vin) {
    res.status(400).json({message: `vin is missing`})
  } else if (!make) {
    res.status(400).json({message: `make is missing`})
  } else if (!model) {
    res.status(400).json({message: `model is missing`})
  } else if (!mileage) {
    res.status(400).json({message: `mileage is missing`})
  } else {
    next()
  }
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
  checkVinNumberUnique
}