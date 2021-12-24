const carsModel = require("./cars-model")


const checkCarId =async (req, res, next) => {
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

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId
}