// DO YOUR MAGIC
const express = require('express')
const Car = require('./cars-model')
const router = express.Router()
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid,
} = require('./cars-middleware')


router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll()
        res.json(cars)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    res.json(req.car)
})

router.post(
    '/',
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid,
    async (req, res, next) => {
        try {
            const car = await Car.create(req.body)
            res.json(car)
        } catch (err) {
            next(err)
        }
    })

module.exports = router