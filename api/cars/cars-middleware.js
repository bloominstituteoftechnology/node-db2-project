const Cars = require('./cars-model')
var vinValidator = require("vin-validator");

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Cars.getById(id)
    .then((car) => {
      if (car) {
        req.car = car;
        next();
      } else {
        res.status(404).json({
          message: `car with id ${id} is not found`
        });
      }
    })
    .catch(next);
};

const checkCarPayload = (req, res, next) => {
  //const error = { status: 400 }
  if (!req.body.vin) 
    return next({ status: 400, message: "vin is missing" });
  if (!req.body.make) 
    return next({ status: 400, message: "make is missing" });
  if (!req.body.model)
    return next({ status: 400, message: "model is missing" });
  if (!req.body.mileage)
    return next({ status: 400, message: "mileage is missing" });
  next();
};

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body;
  if (vinValidator.validate(vin)) {
    next();
  } else {
    next({ status: 400, message: `vin ${vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.body;
    const existing = await Cars.getByVin(vin);
    if (existing) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId, 
  checkCarPayload, 
  checkVinNumberValid,
  checkVinNumberUnique
};