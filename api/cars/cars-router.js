const router = require('express').Router()
const Cars = require('./cars-model')
const { checkCarId, 
    checkCarPayload, 
    checkVinNumberValid, 
    checkVinNumberUnique,
    getByVin
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res) => {
    res.status(200).json(req.car)
})

router.post('/',
checkCarPayload,
checkVinNumberValid,
checkVinNumberUnique,
async (res, req, next) => {
    try {
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

module.exports = router
