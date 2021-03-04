// DO YOUR MAGIC

const express = require('express');
const Cars = require('./cars-model');

const router = express.Router();


router.get('/cars', async (req, res, next) => {
    try {
        const carResults = await Cars.getAll();
        res.status(200).json(carResults);
    } catch (err) {
        next(err);
    }
})

router.get('/cars/:id', async (req, res, next) => {
    try {
        const car = await Cars.getById(req.params.id);
        res.status(200).json(car);
    } catch (err) {
        next(err);
    }
})

router.post('/cars', async (req, res, next) => {
    try {
        const newCar = await Cars.addNew(req.body);
        res.status(201).json(newCar)
    } catch (err) {
        next(err);
    }
})

router.put('/cars/:id', async (req, res, next) => {
    try {
        const carUpdates = req.body;
        const updatedCar = await Cars.updateById(req.params.id, carUpdates);
        res.status(201).json(updatedCar)
    } catch (err) {
        next(err);
    }
})

router.delete('/cars/:id', async (req, res, next) => {
    try {
       await Cars.removeById(req.params.id);
       res.status(204).end()
    } catch (err) {
        next(err);
    }
})

module.exports = router;
