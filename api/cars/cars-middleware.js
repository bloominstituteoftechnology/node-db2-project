var vinValidator = require('vin-validator')
//var isValidVin = vinValidator.validate('11111111111111111'); // true
const db = require("./cars-model")

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const uniqueID = await db.getById(req.params.id)
    if (!uniqueID) {
      res.status(404).json({message: `car with id ${req.params.id} is not found`})
    } else {
      req.uniqueID = uniqueID
      next() 
}}

const checkCarPayload =  (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body.vin) {
    res.status(400).json({message: "vin number is missing"})
  } else if (!req.body.make) {
    res.status(400).json({message: "make of car is missing"})
  } else if (!req.body.model) {
    res.status(400).json({message: "model of car is missing"})
  } else if (!req.body.mileage) {
    res.status(400).json({message: "mileage is missing"})
  } else {
    next()
  }
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
  var isValidVin = await vinValidator.validate(req.body.vin)
   if (!isValidVin) {
     res.status(400).json({message: `vin ${req.body.vin} is invalid`})
   } else {
     next()
   }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
    const dupVins = await db.getByVin(req.body.vin)
      if (dupVins) {
        res.status(400).json({message: `vin ${req.body.vin} already exists`})
      } else {
        next()
    }
}
    
    


module.exports = {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid}