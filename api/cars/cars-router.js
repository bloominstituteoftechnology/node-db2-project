// DO YOUR MAGIC
const express = require("express");
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require("./cars-middleware.js");
const Car = require("./cars-model.js");

const router = express.Router();


router.get('/', (req, res) => {
    Car.getAll(req.query)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.get('/:id', checkCarId, (req, res) => {
    const { id } = req.params;
    Car.getById(id)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.post('/', checkVinNumberValid, async (req, res, next) => {
    try {
        const newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    } catch (error) {
        next(error)
    }
})

module.exports = router