const db = require('../../data/db-config')
const Cars = require('./cars-model')
// const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  try{
    const cars = await Cars.getById(req.params.id)
   if(!car) {
    next({status: 404, message: 'not found'})
   }else {
     req.car = car
     next()
   }
} catch (error) {
    next(error)
}  
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  
}
module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid,
}