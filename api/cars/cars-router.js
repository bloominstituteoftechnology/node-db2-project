// DO YOUR MAGIC
const express = require('express');
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware.js');
const Car = require("./cars-model.js")

const router = express.Router();

router.get("/", (req, res) => {
    try {
        Car.getAll(req.query)
        .then(car => {
            res.status(200).json(car)
        })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

router.get("/:id", checkCarId, (req, res) => {
    try {
        Car.getById(req.params.id)
        .then(car => {
                res.status(200).json(car)
        })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

router.post("/", checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res) => {
try {
    const newCar = req.body
    Car.create(newCar)
    .then(car => {
        res.status(201).json(car)
    })
} catch (error) {
    res.status(500).json({ message: error.message })
}
})

module.exports = router