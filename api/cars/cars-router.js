// DO YOUR MAGIC
const express = require('express');

const Cars = require('./cars-model');

const {checkCarId} = require('./cars-middleware');
const {checkCarPayload} = require('./cars-middleware');
const {checkVinNumberValid} = require('./cars-middleware');
const {checkVinNumberUnique} = require('./cars-middleware');

const router = express.Router();

router.get('/api/cars', async (req, res) => {
    try {
        const cars = Cars.getAll();
        res.status(200).json(cars);
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});

router.get('/api/cars/:id', checkCarId, async (req, res) => {
    const {id} = req.body;

    try {
        const car = Cars.getById(id);
        res.status(200).json(car);
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});

router.post('/api/cars', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res) => {
    const car = req.body;

    try {
        const newCar = Cars.create(car);
        res.status(201).json(newCar);
    } catch (err) {
        res.status(500).json({ Error: {err} });
    }
});

module.exports = router;