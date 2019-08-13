const express = require('express');

const db = require('../../data/dbConfig');
const { validateCarId, validateCarData } = require('../middleware');

const router = express.Router();

router.use('/:id', validateCarId);

router.get('/', async (req, res, next) => {
    try {
        const cars = await db('cars');
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const [car] = await db('cars').where({ carId: req.params.id });
        res.status(200).json(car);
    } catch (error) {
        next(error);
    }
});

router.post('/', validateCarData, async (req, res, next) => {
    const newCar = req.body;
    try {
        const [id] = await db('cars').insert(newCar);
        const [addedCar] = await db('cars').where({ carId: id });
        res.status(201).json(addedCar);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    const changes = req.body;
    try {
        await db('cars')
            .update(changes)
            .where({ carId: req.params.id });
        const [updatedCar] = await db('cars').where({
            carId: req.params.id,
        });
        res.status(200).json(updatedCar);
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const amt = await db('cars')
            .where({ carId: req.params.id })
            .delete();
        const remainingCars = await db('cars');
        res.status(200).json(remainingCars);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
