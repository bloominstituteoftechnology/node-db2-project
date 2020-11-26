const express = require('express');

const db = require('../data/config');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db('cars').where({ id }).first()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
});

router.post('/', (req, res) => {
    const carData = req.body;
    
    db('cars').insert(carData)
        .then(ids => {
            db('cars').where({ id: ids[0] })
                .then(newCarEntry => {
                    res.status(201).json(newCarEntry);
                });
        })
        .catch(err => {
            res.status(500).json({
                message: err.message
            });
        });
});

module.exports = router;