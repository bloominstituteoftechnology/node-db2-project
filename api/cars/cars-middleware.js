const cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
      const car = await cars.getById(req.params.id)
        if (car) {
          req.car = car;
          next();
        } else {
          res.status(404).json({ message: `car with id ${req.params.id} is not found` });
        }
    } catch (err) {
      next(err);
    }
  }
}

const checkCarPayload = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
        const vin = req.body.vin;
        const make = req.body.make;
        const model = req.body.model;
        const mileage = req.body.mileage;

        if (!vin) {
          res.status(400).json({ message: `${vin} is missing` });
        } else if (!make) {
          // console.log(name, budget);
          res.status(400).json({ message: `${make} is missing` });
        } else if (!model) {
          res.status(400).json({ message: `${model} is missing` });
        } else if (!mileage) {
          res.status(400).json({ message: `${mileage} is missing` });
        } else {
          next();
        }

    } catch (err) {
          next(err);
    }
  }
}

const checkVinNumberValid = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {

      const isValidVin = vinValidator.validate(req.body.vin);

      if (!isValidVin) {
        res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
      } else {
        next();
      }

    } catch (err) {
      next(err);
    }
  }
}

const checkVinNumberUnique = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
        const allCars = await cars.getAll();
        const vin = req.body.vin;

       const results = allCars.filter((item) => {
          if ( item.vin === vin) {
            return item;
          }
        })
        if (results.length > 0) {
          res.status(400).json({ message: `vin ${req.body.vin} already exists` });
        } else {
          next();
        }
      } catch (err) {
          next(err);
      }
  }

}

module.exports = {
  checkVinNumberUnique,
  checkVinNumberValid,
  checkCarPayload,
  checkCarId
}
