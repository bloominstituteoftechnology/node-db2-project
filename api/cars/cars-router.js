const router = require('express').Router()
const Cars = require('./cars-model')
const { checkCarId } = require('./cars-middleware')

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

module.exports = router
