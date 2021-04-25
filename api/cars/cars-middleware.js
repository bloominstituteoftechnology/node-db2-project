const cars = require("../cars/cars-model")
const vinValidator = require("vin-validator")

const checkCarId = (req, res, next) => {
  return () => {
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
const checkCarPayload = (req, res, next) => {
  return () => {
    console.log(req.body)

    if(!req.body.vin){
      const fieldName = vin

      return res.status(400).json({
        message: `${fieldName} is missing`
      })
    } else if(!req.body.make){
        const fieldName = make

        return res.status(400).json({
        message: `${fieldName} is missing`
      })
    } else if(!req.body.model){
      const fieldName = model

      return res.status(400).json({
        message: `${fieldName} is missing`
      })
    } else if(!req.body.mileage){
      const fieldName = mileage
      return res.status(400).json({
        message: `${fieldName} is missing`
      })
    }

    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  return () => {
    if(vinValidator.validate(`${req.body.vin}`) = false){
      res.status(400).json({
        message: `Vin ${req.body.vin} is invalid`
      })
    }
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  return () => {
    cars.getAll()
      .then(allCars => {
        Array.from(allCars)

        allCars.find(car => {
          if(car.body.vin === req.body.vin){
            return res.status(400).json({
              message: `Vin ${req.body.vin} already exists`
            })
          }
        })
      })
    
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
