const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  const {id} = req.params
  Cars.getById(id)
  .then((car) => {
    if(car){
      req.car = car
      next()
    }else{
      res.status(400).json({message: `Car with id ${id} is not found`})
    }
  })
  .catch(next)
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body
  const err = {status: 400}
  if(!vin || typeof vin !== 'string' || !vin.trim()){
    err.message = 'vin is missing'
  }else if(!make || typeof make !== 'string' || make.trim()){
    err.message = 'make is missing'
  }else if(!model || typeof model !== 'string' || model.trim()){
    err.message = 'model is missing'
  }else if(!mileage || typeof mileage !== 'number'){
    err.message = 'mileage is missing'
  }
  if(err.message){
    next(err)
  }else{
    next()
  }
}

const checkVinNumberValid = async (req, res, next) => {
  const {vin} = req.body
  if(vinValidator.validate(vin)){
    next()
  }else{
    next({status: 400, message: `vin ${vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const {vin} = req.body
  try{
    const existing = await Cars.getByVin(vin)
    if(existing){
      next({status: 400, message: `vin ${vin} already exists`})
    }else{
      next()
    }
  }catch(err){
    next(err)
  }
}

module.exports = {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid}
