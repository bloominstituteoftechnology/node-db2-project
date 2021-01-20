const express = require('express');

const db = require('../db/config');
const router = express.Router();

router.get('/car', async (req, res, next) => {
    try {
        const car = await db('car');
        res.status(200).json(car);
    } catch (err) {
        next(err);
    };
});

router.post('/car', async (req, res, next) => {
    try {
        const [ID] = await db('car').insert(req.body);
        const newCar = await db('car').where({ID}).first();
        res.status(201).json(newCar);
    } catch (err) {
        next(err);
    };
});

server.use(err, req, res, next => {
    res.status(500).json({ message: err.message });
});

module.exports = router;