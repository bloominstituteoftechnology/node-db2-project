const cars = require('./cars-model.js')
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware.js')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const allCars = await cars.getAll()
  res.status(200).json(allCars)
})

router.get('/:id', checkCarId, (req, res) => {
  res.status(200).json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res) => {
  const newCar = await cars.create(req.newCar)
  res.status(200).json(newCar)
})

module.exports = router
