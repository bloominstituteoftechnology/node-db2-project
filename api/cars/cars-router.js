// DO YOUR MAGIC
const router = require('express').Router()
const Car = require('./cars-model')
const { checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique } = require('./cars-middleware')

router.get('/api/cars', (req, res) => {
    Car.getAll()
        .then(allCars => {
            res.status(200).json(allCars)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
    console.log('getting all cars')
})

router.get('/api/cars/:id', checkCarId, (req, res) => {
    const { id } = req.params;
    Car.getById(id)
        .then(car => {
            res.status(200).json(car)
        })
        .catch(err => {
            res.status(400).json({ message: err.message })
        })
})

router.post('/api/cars', checkVinNumberUnique, checkVinNumberValid, checkCarPayload, (req, res) => {
    Car.create(req.body)
        .then(newCar => {
            res.status(201).json(newCar)
        })
        .catch(err => {
            res.status(500).json({ message: err.message })
        })
})



module.exports = router;