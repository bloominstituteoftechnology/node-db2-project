// DO YOUR MAGIC
const router = require('express').Router()
const Car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid,
} = require('./cars-middleware')


router.get('/', async (req, res, next) => {
    try{
        const cars = await Car.getAll()
        res.json(cars)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    res.json(req.car)
})

router.post('/', 
checkCarPayload, 
checkVinNumberUnique, 
checkVinNumberValid, 
async (req, res, next) => {
    try{
        const newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    }catch (error) {
        next(error)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });
  module.exports = router