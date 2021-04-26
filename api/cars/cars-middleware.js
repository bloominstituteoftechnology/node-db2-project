const cars = require("../cars/cars-model")
const vinValidator = require("vin-validator")

const checkCarId = () => {
  return (req, res, next) => {
    cars.getById(req.params.id)
      .then(car => {
        if(car){
          req.car = car
          next()
        } else {
          res.status(404).json({
            message: `car with id ${req.params.id} is not found`
          })
        }
      })
      .catch(next)
  }
}
//vin make model mileage
const checkCarPayload = () => {
  return (req, res, next) => {
    if(!req.body.vin){
      const fieldName = 'vin'

      return res.status(400).json({
        message: `${fieldName} is missing`
      })
    } else if(!req.body.make){
        const fieldName = 'make'

        return res.status(400).json({
        message: `${fieldName} is missing`
      })
    } else if(!req.body.model){
      const fieldName = 'model'

      return res.status(400).json({
        message: `${fieldName} is missing`
      })
    } else if(!req.body.mileage){
      const fieldName = 'mileage'
      return res.status(400).json({
        message: `${fieldName} is missing`
      })
    }

    next()
  }
}

const checkVinNumberValid = () => {
  return (req, res, next) => {
    const validation = vinValidator.validate(`${req.body.vin}`)
    if(validation === false){
      res.status(400).json({
        message: `vin ${req.body.vin} is invalid`
      })
    }
    next()
  }
}

const checkVinNumberUnique = () => {
  return async (req, res, next) => {
    const allCars = await cars.getAll()
      try {
        allCars.forEach(car => {
          if(car.vin === req.body.vin){
            res.status(400).json({
              message: `vin ${req.body.vin} already exists`
            })
          }
        })
      } catch(err) {
        next(err)
      }
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
