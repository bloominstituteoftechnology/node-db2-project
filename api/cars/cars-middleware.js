const {getById, getAll} = require("./cars-model")
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  var carInfo = await getById(req.params.id)
  if(!carInfo.make) {
    res.status(404).json({error: `car with ${req.params.id} is not in the database`})
  } else {
    res.carInfo = carInfo
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  if(!req.body.vin) {
    res.status(400).json({error: "vin is missing"})
  } else if(!req.body.make) {
    res.status(400).json({error: "vehicle make is missing"})
  } else if(!req.body.model) {
    res.status(400).json({error: "vehicle model is missing"})
  } else if(!req.body.milage) {
    res.status(400).json({error: "vehicle milage is missing"})
  } else next()
}

const checkVinNumberValid = (req, res, next) => {
  var isValidVin = vinValidator.validate(req.body.vin)
  if(isValidVin == "true") {
    next()
  } else {
    res.status(400).json({error: "vin number is invalid"})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const newVin = req.body.vin
  const carInfo = await getAll()
  const searchVins = {}

  for(let i = 0; i < carInfo.length; i++) {
    searchVins[carInfo[i].vin] = carInfo[i]
  }

  searchVins[newVin]

  if(!searchVins.vin) {
    req.carsList = carInfo
    next()
  } else {
    res.status(400).json({error: `vin ${newVin} already exists`})
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}