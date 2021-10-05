const Cars = require('./cars-model')

const checkCarId = (req, res, next) => {
  const { id } = req.params;
  Cars.get(id)
    .then((cars) => {
      if (cars) {
        req.cars = cars
        next()
      } else {
        res.status(404).json({
          message: `car with id ${id} is not found`
        })
      }
    })
    .catch(next);
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
  checkCarId, checkCarPayload, checkVinNumberValid,
  checkVinNumberUnique
}