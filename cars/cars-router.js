const express = require('express');
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then((cars) => {
            res.status(200).json(cars);
        })
        .catch(() => {
            res.status(500).json({message: "There was an error retrieving the cars."});
        })
});

router.post('/', (req, res) => {
    const carData = req.body;

    db('cars').insert(carData)
        .then((ids) => {
            db('cars').where({id: ids[0]})
                .then((newCar) => {
                    res.status(201).json(newCar)
                });
        })
        .catch(() => {
            res.status(500).json({message: "There was an error creating the car entry."})
        })
});

module.exports = router; 