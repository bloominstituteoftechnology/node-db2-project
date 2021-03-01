const cars = require("./cars-model")
const vinValidator = require('vin-validator');

function checkCarId () {

  return async (req, res, next) => {
    
    try{ 
    const carId = req.params.id
    cars.getById(carId)
    .then((action) => {
      if(action) {
        req.action = action
        next()
      } else{
        res.status(404).json({
          message: `car with id ${carId} is not found`
        })
      }
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        message: "Error retrieving car"
      })
    })
    }catch(err){
      next(err)
    }
    
  }
  
}

function checkCarPayload ()  {

  return async (req, res, next) => {
    if (!req.body.vin) {
      return res.status(400).json({
        message: "Vin is missing"
      })
    }

    if (!req.body.make) {
      return res.status(400).json({
        message: "Make is missing"
      })
    }

    if (!req.body.model) {
      return res.status(400).json({
        message: "Model is missing"
      })
    }

    if (!req.body.mileage) {
      return res.status(400).json({
        message: "Mileage is missing"
      })
    }
    next()
  }
}

function checkVinNumberValid () {

  return async (req, res, next) => {
    const carVin = req.body.vin
    const isValidVin = vinValidator.validate(carVin)

    if(!isValidVin) {
      return res.status(400).json({
        message: `Vin ${carVin} is invalid`

      })
    }
    next()
  }
}

function checkVinNumberUnique () {

  return async (req, res, next) => {
    try{
      const carVin = req.body.vin
      const results = await cars.getAll()
      const carVins = results.map(car => car.vin)

      if (carVins.includes(carVin)){
        return res.status(400).json({
          message: `Vin ${carVin} already exists`
        })
      } else{
        next()
      }
    }
    catch(err) {
      next(err)
    }
  }
}

module.exports ={
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
