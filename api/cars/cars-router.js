const router = require('express').Router()
const cars = require('./cars-model')
const mw = require('./cars-middleware')

router.get('/', (req, res, next) => {
    cars.get()
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.json({ message: err.message })
        })
})

router.get('/:id', mw.checkCarId, (req, res, next) => {
    const {id} = req.params
    cars.getById(id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.json({ message: err.message })
        })
})

router.post('/', mw.checkVinNumberValid, mw.checkVinNumberUnique, mw.checkCarPayload, (req, res, next) => {
    const newCar = req.body
    cars.create(newCar)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.json({ message: err.message })
        })
})

module.exports = router