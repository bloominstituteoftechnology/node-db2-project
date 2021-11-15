// DO YOUR MAGIC
const router = require('express').Router();
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

const Cars = require('./cars-model');

router.get('/', async (req, res, next) => {

    try {
        const cars = await Cars.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get(':/id', checkCarId, async (req, res, next) => {
    res.json(req.car)
    next()
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {

    try{
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

router.use((err, req, res) => {
    res.status(err.status || 500).json({
        message: err.message
    })
})

module.exports = router