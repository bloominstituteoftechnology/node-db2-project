// DO YOUR MAGIC
const express = require('express')
const Car = require('./cars-model')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const all = await Car.getAll()
        res.json(all)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const car = await Car.getById(req.params.id)
        res.json(car)
    } catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})

module.exports = router
