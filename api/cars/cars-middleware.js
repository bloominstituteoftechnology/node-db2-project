const Cars = require('./cars-model')
var vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params
  Cars.getById(id)
    .then(car => {
      if (!car) {
        res.status(404).json({message: `car with id ${id} is not found`})
      } else {
        req.car = car;
        next()
      }
    }).catch(err => {
      next(err)
    })

}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  const {vin, make,model,mileage} = req.body;
  if (!vin) {
    res.status(400).json({message: `vin is missing`})
  } else if (!make) {
    res.status(400).json({message: `make is missing`})
  } else if (!model) {
    res.status(400).json({message: `model is missing`})
  } else if (!mileage) {
    res.status(400).json({message: `mileage is missing`})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next,err) => {
  // DO YOUR MAGIC
  // validator does not work
  if(!vinValidator.validate(req.body.vin)) {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {

  try {
    const car = await Cars.getByVin(req.body.vin);

    if (car) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch {
    res.status(500).json({ message: `something went wrong checking the vin` });
  }

  // DO YOUR MAGIC
  // const {vin} = req.body;
  // if ((Cars.getAll().filter(car => car.vin === vin)).length === 0) {
  //   next()
  // } else {
  //   res.status(400).json({message: `vin ${vin} already exists`})
  // }


}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}