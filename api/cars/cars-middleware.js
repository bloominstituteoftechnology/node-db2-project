const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const validCar = await Cars.getById(id);
    if(!validCar){
      res.status(404).json({
        message: `car with id ${id} is not found`
      });
    } else {
      req.car = validCar
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  const error = { status: 400 };
  if(!vin || typeof vin !== 'string' || !vin.trim()) {
    error.message = "vin is missing"
  } else if(!make || typeof make !== 'string' || !make.trim()) {
    error.message = "make is missing"
  } else if(!model || typeof model !== 'string' || !model.trim()) {
    error.message = "model is missing"
  } else if(!mileage || typeof mileage !== 'number') {
    error.message = "mileage is missing"
  } 
  if(error.message){
    next(error)
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  const isValidVin = vinValidator.validate(vin);
  if(!isValidVin){
    res.status(400).json({
      message: `vin ${vin} is invalid`
    })
  }else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const exists = await Cars.getByVin(vin)
    if(exists) {
      res.status(400).json({
        message: `vin ${vin} already exists`
      })
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
