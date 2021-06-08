//imports
const Car = require('./cars-model');
const db = require('../../data/db-config');
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const car = await Car.getById(req.params.id)
  if (car){
    req.car = car
    next()
  }else{
    res.status(404).json({message: `car with id ${req.params.id} is not found`})
  }

}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const error = {status: 400};

  const {vin, make, model,mileage} = req.body;
  if(vin === undefined){
    error.message = "vin is missing" ;
    next(error);
  }else if (make === undefined){
    error.message = "make is missing" ;
    next(error);
  }else if (model === undefined){
    error.message = "model is missing" ;
    next(error);
  }else if (mileage === undefined){
    error.message = "mileage is missing" ;
    next(error);
  }else{
    next();
  }


}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const err = {status: 400};
  const vin = req.body.vin;
  const validate = vinValidator.validate(vin);
  if (!validate) {
    err.message = `vin ${vin} is invalid`;
    next(err);
  }else{
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const vin = req.body.vin
  const vinList = await Car.getByVin(vin)
  // console.log(vinList)
  const err = {status:400}
  try{
    if(vinList){
      err.message = `vin ${vin} already exists`
      
      next(err)
    }else{
      next()
    }


  }//end of try
  catch(error){
    next(error)
  }//end of catch
}
module.exports ={
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}