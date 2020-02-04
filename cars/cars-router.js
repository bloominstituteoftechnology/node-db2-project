const express = require('express');
const db = require('../data/db-config.js');


const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(car => {
            res.json(car);
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to retrieve cars', err });
        });
});

router.post('/', (req, res) => {
    const carsData = req.body;
    db('cars').insert(carsData)
        .then(ids => {
            db('cars').where({ id: ids[0] })
                .then(newCarEntry => {
                    res.status(201).json(newCarEntry);
                });
        })
        .catch(err => {
            console.log('POST error', err);
            res.status(500).json({ message: "Failed to store data" });
        });
});

module.exports = router;