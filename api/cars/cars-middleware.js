const { getById, getByVin } = require('./cars-model.js');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const carId = req.params.id;
  const car = await getById(carId);

  if (!car) {
    // if the id in req.params does not exist in the database.
    res.status(404).send({ message: `car with id ${carId} is not found` })
  }else {
    // Passing value from middleware to controller
    // We do this so we don't have to query twice
    // @see https://stackoverflow.com/questions/18875292/passing-variables-to-the-next-middleware-using-next-in-express-js
    res.locals.car = car;
    next();
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // console.log(req.query, req.params, req.body);
  const { vin, make, model, mileage } = req.body;
  let missingField = undefined;

  if (!vin) { missingField = 'vin';
  } else if(!make){ missingField = 'make';
  } else if(!model) { missingField = 'model';
  } else if (!mileage) { missingField = 'mileage';
  }

  if (missingField) {
    // if any required field is missing (req.params)
    res.status(400).send({ message: `${missingField} is missing` })
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const vinNumber = req.body.vin;
  const invalidVin = vinNumber === undefined || vinNumber.length !== 17;

  if (invalidVin) {
    res.status(400).send({ message: `vin ${vin} is invalid` })
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const vinNumber = req.body.vin;
  const carsWithVin = await getByVin(vinNumber);
  const oneOrMoreExistingCarsHasVin = carsWithVin.length > 0;

  if (oneOrMoreExistingCarsHasVin) {
    res.status(400).send({ message: `vin ${vinNumber} already exists` })
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
