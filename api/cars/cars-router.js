const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');
const {
    checkVinNumberUnique,
    checkVinNumberValid,
    checkCarPayload,
    checkCarId
 } = require('./cars-middleware');


router.get('/api/cars', async (req, res, next) => {
    try {
        const carResults = await Cars.getAll();
        res.status(200).json(carResults);
    } catch (err) {
        next(err);
    }
})

router.get('/api/cars/:id', checkCarId(), async (req, res, next) => {
    try {
        const car = await Cars.getById(req.params.id);
        res.status(200).json(car);
    } catch (err) {
        next(err);
    }
})

router.post('/api/cars', checkCarPayload(),checkVinNumberValid(), checkVinNumberUnique(), async (req, res, next) => {
    try {
        const newCar = await Cars.addNew(req.body);
        res.status(201).json(newCar)
    } catch (err) {
        next(err);
    }
})

router.put('/api/cars/:id', checkCarId(), checkVinNumberValid(), checkVinNumberUnique(), checkCarPayload(), async (req, res, next) => {
    try {
        const carUpdates = req.body;
        const updatedCar = await Cars.updateById(req.params.id, carUpdates);
        res.status(201).json(updatedCar)
    } catch (err) {
        next(err);
    }
})

router.delete('/api/cars/:id', checkCarId(), async (req, res, next) => {
    try {
       await Cars.removeById(req.params.id);
       res.status(204).end()
    } catch (err) {
        next(err);
    }
})

module.exports = router;
