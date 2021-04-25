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

const checkCarPayload = async (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = async (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
}



module.exports = {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid}