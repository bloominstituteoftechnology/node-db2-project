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
  if(car){
    req.car = car
    next()
  } else {
    res.status(404).json({ message: `car with id ${req.params.id} is not found`})
  }
}

function checkCarPayload(req, res, next){
  next()
}

function checkVinNumberValid(req, res, next){
  next()
}

function checkVinNumberUnique(req, res, next){
  next()
}
