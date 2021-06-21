const cars = require("../cars/cars-model")
const vinValidator = require("vin-validator")

const checkCarId = () => {
  return (req, res, next) => {
    cars.getById(req.params.id)
      .then(car => {
        if(car) {
          req.car = car
          next()
        }else {
          res.status(404).json({message: 'The car you are trying to access does not exist!'})
        }
      })
      .catch(next)

  }
}

const checkCarPayload = () => {
  // DO YOUR MAGIC
  return (req, res, next) => {

    if(!req.body.vin) {
      
      const fieldName = 'vin'

      return res.status(400).json({message: 'vin entry missing'})

    }else if(!req.body.make) {

      const fieldName = 'make'

      return req.status(400).json({message: 'make entry missing'})

    }else if(!req.body.model) {

      const fieldName = 'model'

      return req.status(400).json({message: 'model field missing'})

    }else if(!req.body.title) {

      const fieldName = 'title'

      return req.status(400).json({message: 'title field missing'})

    }else if(!req.body.transmission) {

      const fieldName = 'transmission'

      return req.status(400).json({message: 'transmission field missing'})

    }else if(!req.body.mileage) {

      const fieldName = 'mileage'

      return req.status(400).json({message: 'mileage field missing'})
    }
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}