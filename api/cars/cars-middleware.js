const Car = require("./cars-model.js");
var vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  try {
    const car = await Car.getById(req.params.id)
    if(car){
      console.log("car: ", car)
      req.car = car
      next()
    } else {
      res.status(404).json({ message: "car not found" })
    }
  } catch (err) {
    next(err)
  }
}
const checkCarPayload = async (req, res, next) => {
  const {vin, make, model, mileage, transmission, title} = req.body;

  let trimmedVin = undefined;
  let trimmedMake = undefined;
  let trimmedModel = undefined;


  if (typeof vin === "undefined") {
    res.status(400).json({ message: "vin is missing"})
  
  } else if (typeof make === "undefined") {
    res.status(400).json({ message: "make is missing"})

  } else if (typeof model === "undefined") {
    res.status(400).json({ message: "model is missing"})

  } else if (typeof mileage === "undefined") {
    res.status(400).json({ message: "mileage is missing"})

  } else {
    trimmedVin = vin.trim()
    trimmedMake = make.trim()
    trimmedModel = model.trim()


    const car = {
      vin: trimmedVin,
      make: trimmedMake,
      model: trimmedModel,
      mileage: mileage,
      title: title ? title.trim() : title,
      transmission: transmission ? transmission.trim() : transmission
    }

    req.car = car

    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  let newVin = req.body.vin;
  newVin = newVin.trim().toLowerCase();
  let isValid = vinValidator.validate(newVin)
  if(isValid){
    next()
  } else {
    res.status(400).json({ message: `vin ${newVin} is invalid` })
  }
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  let newVin = req.body.vin;
  newVin = newVin.trim().toLowerCase();
  Car.getAll()
  .then((cars) => {
    const existingVin = cars.find((car) => {
      return car.vin.trim().toLowerCase() === newVin
    })
    if(existingVin) {
      res.status(400).json({ message: `vin ${newVin} already exists` })
    } else {
      next()
    }
  })
  .catch((error) => {
    next(error)
  })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}