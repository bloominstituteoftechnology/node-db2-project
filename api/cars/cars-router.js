const express = require('express')
const Cars = require('./cars-model')
const router = express.Router()
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

router.get('/', async (req, res) => {
    Cars.getAll()
        .then(cars => {res.status(200).json(cars)})
        .catch(err => {res.status(500).json({message: 'error fetching all the cars'})})
})

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car)
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res) => {
    Cars.create(req.body)
        .then(car => {res.status(202).json(car)})
        .catch(() => res.status(500).json({message: 'car creation error'}))
})

module.exports = router
