// DO YOUR MAGIC
const express = require('express')
const Car = require('./cars-model')
const md = require('./cars-middleware')

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
        const all = await Car.getAll()
        res.json(all)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', md.checkCarId, async (req, res, next) => {
    try {
        const car = await Car.getById(req.params.id)
        res.json(car)
    } catch (err) {
        next(err)
    }
})

router.post('/', 
md.checkCarPayload, 
md.checkVinNumberValid,
md.checkVinNumberUnique,
async (req, res, next) => {
    try {
        const car = await Car.create(req.body)
        res.json(car)
    } catch (err) {
        next(err)
    }
})

module.exports = router
