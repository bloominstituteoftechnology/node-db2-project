const Cars = require('./cars-model')
var vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  const {id} = req.params
  Cars.getById(id)
      .then(car => {
        if (!car) {res.status(404).json({ message: `Car ${id} not found` })
      } else {
        req.car = car
        next()
      }
      })
      .catch(err => {
        next(err)
      })
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body
  if (!vin) {res.status(400).json({ message: 'VIN missing' })
  } else if (!make) {res.status(400).json({ message: 'Make missing' })
  } else if (!model) {res.status(400).json({ message: 'Model missing'})
  } else if (!mileage) {res.status(400).json({ message: 'Mileage missing'})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  if (!vinValidator.validate(req.body.vin)) {
    res.status(400).json({ message: `invalid vin: ${req.body.vin} ` })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const car = await Cars.getByVin(req.body.vin)
    if (car) {res.status(400).json({ message: `vin ${req.body.vin} exists already!` })
  } else {
    next()
  }
  } catch {res.status(500).json({ message: `trouble in vinland! cannot check vin.` })
  }
}

module.exports = { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique }