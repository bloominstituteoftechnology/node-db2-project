const Cars = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = () => {
  // DO YOUR MAGIC
  return async (req, res, next) => {
    try {
      const { id } = req.params;
      const car = await Cars.getById(id);

        if (!car) {
          return res.status(404).json({ message: `car with id ${id} is not found` })
        } else {
          req.car = car;
          next();
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
        const {vin, make, model, mileage} = req.body;

        if (!vin) {
          return res.status(400).json({ message: `vin is missing` });
        } else if (!make) {
          // console.log(name, budget);
          return res.status(400).json({ message: `make is missing` });
        } else if (!model) {
          return res.status(400).json({ message: `model is missing` });
        } else if (!mileage) {
          return res.status(400).json({ message: `mileage is missing` });
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
        const allCars = await Cars.getAll();
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
