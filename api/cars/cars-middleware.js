const vinValidator = require('vin-validator')

const {
  getById,
  getByVin
} = require('./cars-model.js')


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}

async function checkCarId(req, res, next){
  const car = await getById(req.params.id)
  if( car ){
    req.car = car
    next()
  } else {
    res.status(404).json({ message: `car with id ${req.params.id} is not found` })
  }
}

const required = ['vin', 'make', 'model', 'mileage']
function checkCarPayload(req, res, next){
  const keys = Object.keys(req.body)
  for(let i = 0; i < required.length; i++){
    if( keys.indexOf( required[i] ) === -1 ){
      res.status(400).json({ message: `${required[i]} is missing` })
      return
    }
  }

  const {
    vin,
    make,
    model,
    mileage,
    title = null,
    transmission = null
  } = req.body

  req.newCar = {
    vin,
    make,
    model,
    mileage,
    title,
    transmission
  }

  next()
}

function checkVinNumberValid(req, res, next){
  vinValidator.validate(req.newCar.vin)
    ? next()
    : res.status(400).json({ message: `vin ${req.newCar.vin} is invalid` })
}

async function checkVinNumberUnique(req, res, next){
  const matching = await getByVin(req.newCar.vin)
  matching.length === 0
    ? next()
    : res.status(400).json({ message: `vin ${req.newCar.vin} already exists`})
}
