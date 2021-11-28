// DO YOUR MAGIC
const router = require('express').Router()
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid,
} = require('./cars-middleware')
const Cars = require('./cars-model')

router.get('/', async (req, res, next) => {
    try{
        const data = await Cars.getAll()
        res.json(data)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberUnique, checkVinNumberValid, async (req, res, next) => {
    try{
        const newCar = await Cars.create(req.body)
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