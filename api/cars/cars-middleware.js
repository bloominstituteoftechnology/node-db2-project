const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try{
    const cars = await Cars.getById(req.params.id);
    if(cars){
      req.cars = cars;
      next();
    } else {
      next({status:404, message: `car with id ${req.params.id} is not found`})
    }
  } catch (error){
    next(error);
  }
}

const checkCarPayload = async (req, res, next) => {
  const { vin, make, model, mileage, title, transmission } = req.body
  try {
    if(!vin){
      next({status:400, message: `vin is missing`});
    }else if(!make){
      next({status:400, message: `make is missing`});
    }else if(!model){
      next({status:400, message: `model is missing`});
    }else if(!mileage){
      next({status:400, message: `mileage is missing`});
    }else {
      req.new = { vin, make, model, mileage, title, transmission }
      next();
    }
  } catch (error) {
    next(error);
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const { vin } = req.body;
  const isValid = vinValidator.validate(vin);
  if(isValid){
    next();
  } else {
    next({status: 400, message:`vin ${vin} is invalid`});
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const exists = await Cars.getByVin(req.body.vin);
    if(exists){
      next({status:400, message:`vin ${req.body.vin} already exists`});
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}



module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}