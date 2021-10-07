const express = require('express');
const Cars = require('./cars-model');

const router = express.Router();
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware');

router.get('/', async (req, res, next) => {
    try {
        const carsArray = await Cars.getAll();
        res.json(carsArray);
    } catch (err) {
        next(err);
    }
});

router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        res.json(req.car);
    } catch (err) {
        next(err);
    }
});

router.post('/',
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
    async (req, res, next) => {
        try {
            const addCar = await Cars.create(req.body);
            // console.log('add car', addCar);
            res.status(201).json(addCar);
        } catch (err) {
            next(err);
        }
    });

// router.put('/:id', checkCarId, async (req, res, next) => {
//     res.json("PUT with id wired/fired needs to be finished");
// });

// router.delete('/:id', checkCarId, async (req, res, next) => {
//     res.json("delete wired/fired and needs to be finished");
// });

module.exports = router;