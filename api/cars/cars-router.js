const router = require('express').Router()
const cars = require('./cars-model.js')
const middleware = require('./cars-middleware.js')

router.get('/', async (req, res, next) => {
 const allCars = await cars.getAll()
 res.status(200).json(allCars)
})


router.get('/:id', middleware.checkCarId, async (req, res, next) => {
    const car = await cars.getById(req.params.id)
    res.status(200).json(car)
})


router.post('/', middleware.checkCarPayload, middleware.checkVinNumberValid, middleware.checkVinNumberUnique, async (req, res, next) => {
    const newCar = await cars.create(req.body)
    res.status(201).json(newCar)
})


module.exports = router;