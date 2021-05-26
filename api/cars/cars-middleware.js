const Cars = require('./cars-model');

const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  
  try {
    const car = await Cars.getById(req.params.id);
    if(car) {
      req.car = car;
      next();
    } else {
      res.status(404).json({ message: "car with id <car id> is not found" });
    };
  } catch (err) {
    res.status(500).json({ message: "Error processing request", error: err });
  };
};

const checkCarPayload = (req, res, next) => {
  
  try {
    if(req.body && Object.keys(req.body).length>0) {
      if(!req.body.vin) {
        res.status(400).json({ message: "vin is missing" });
      } else if(!req.body.make) {
        res.status(400).json({ message: "make is missing" });
      } else if(!req.body.model) {
        res.status(400).json({ message: "model is missing" });
      } else if(!req.body.mileage) {
        res.status(400).json({ message: "mileage is missing" });
      } else {
        next();
      };
    };
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error });
  };
};

const checkVinNumberValid = (req, res, next) => {
  
  const validVin =  vinValidator.validate(req.body.vin);

  try {
    if(validVin) {
      next();
    } else {
      res.status(400).json({ message: "vin <vin number> is invalid" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing request", error: error });
  };
};

const checkVinNumberUnique = async (req, res, next) => {
  
  const newCar = req.body;
  const list = await Cars.getAll();

  try {
    for(let i = 0; i < list.length; i++) {
      if(newAccount.vin === list[i].vin) {
        res.status(400).json({ message: "vin <vin number> already exists" });
      } else {
        next();
      };
    };
  } catch (err) {
    res.status(500).json({ message: "Error processing request", error: err });
  };
};


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
};
