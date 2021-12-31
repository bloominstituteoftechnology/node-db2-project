const carsModel = require("./cars-model")
const vinValidator = require("vin-validator")

const checkCarId = async (req, res, next) => {
  try {
    const {id} = req.params
    const car = await carsModel.getById(id)
    if (!car) {
      res.status(404).json(`car with id ${id} could not be found`)
    } else {
      res.car = car
      next()
    }
  } catch (err) {
    next(err)
  }
}

const checkCarPayload = async (req, res, next) => {
  try {
    const { name } = req.body
    const { vin } = req.body
    const { make } = req.body
    const { model } = req.body
    const { milage } = req.body
    
    if (!name) {
      res.status(400).json({message: "name is missing"})
    } else if (!vin) {
      res.status(400).json({message: "vin is missing"})
    } else if (!make) {
      res.status(400).json({message: "make is missing"})
    } else if (!model) {
      res.status(400).json({message: "model is missing"})
    } else if (!milage) {
      res.status(400).json({message: "milage is missing"})
    } else {
      next()
    }
    
  }
  catch (err) {
    next(err)
  }
}

const checkVinNumberValid = async (req, res, next) => {
  const vin = req.body.vin
  if (!vin) {
    res.status(400).json(`vin ${vin} is invalid`)
    next()
  } else {
    vinValidator.validate(vin)
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const vin = req.body.vin
    const existingVin = await carsModel.getByVin(vin)
    if (!existingVin) {
      next()
    } else {
      res.status(400).json(`vin ${vin} already exist`)
    }
  } catch (err) {
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}