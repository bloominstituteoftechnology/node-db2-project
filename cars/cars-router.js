const express = require('express');

const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve cars' })
    })
});

router.get('/:id', (req, res) => {
    db('cars')
    .then(car => {
        res.json(car)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to retrieve fruit by id' })
    })
});

router.post('/', (req, res) => {
    db('cars')
    .insert(req.body)
    .then(ids => {
        db('cars')
        .where({ id: ids[0] })
        .then(newcar => {
            res.status(201).json(newcar)
        })
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to add car data' })
    })
});

module.exports = router;