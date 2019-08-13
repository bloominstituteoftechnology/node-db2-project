const express = require('express');

const db = require('../../data/dbConfig');

const router = express.Router();

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
        if (car) res.status(200).json(car);
        else
            res.status(404).json({
                message: 'A car with that id does not exist.',
            });
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    const newCar = req.body;
    try {
        const [id] = await db('cars').insert(newCar);
        if (id) {
            const [addedCar] = await db('cars').where({ carId: id });
            res.status(201).json(addedCar);
        }
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    const changes = req.body;
    try {
        const amt = await db('cars')
            .update(changes)
            .where({ carId: req.params.id });
        if (amt) {
            const [updatedCar] = await db('cars').where({
                carId: req.params.id,
            });
            res.status(200).json(updatedCar);
        } else
            res.status(404).json({
                message: 'A car with that id does not exist.',
            });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const amt = await db('cars')
            .where({ carId: req.params.id })
            .delete();
        if (amt) {
            const remainingCars = await db('cars');
            res.status(200).json(remainingCars);
        } else {
            res.status(404).json({
                message: 'A car with that id does not exist.',
            });
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;
