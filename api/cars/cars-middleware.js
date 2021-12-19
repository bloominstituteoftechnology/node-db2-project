const Cars = require('./cars-model')
const vinValidator = require('vin-validator')
const yup = require('yup')
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  try{
    const car = await Cars.getById(req.params.id)
    if(!car){
      next({message: `Car with id ${id} is not found`})
    }else{
      req.car = car
      next()
    }
  }catch(err){
    next(err)
  }
}

const checkCarPayloadSchema = yup.object().shape({
  vin: yup.string().required('vin is missing'),
  make: yup.string().required('make is missing'),
  model: yup.string().required('model is missing'),
  mileage: yup.string().required('mileage is missing'),
  title: yup.string(),
  transmission: yup.string()
})

const checkCarPayload = async (req, res, next) => {
  try{
    const payValidation = await checkCarPayloadSchema.validate(req.body, {strict: false, stripUnkown: true})
    req.body = payValidation
    next()
  }catch(err){
    res.status(400).json({message: err.message})
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
  try{
    const {vin} = req.body
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