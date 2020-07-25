const express = require('express');
const db = require('./data/db-config.js');
const router = express.Router();

router.get('/', (req, res) => {
    db.select('*')
    .from('cars')
    .then(cars => {
        res.status(200).json({ data: cars})
    })
    .catch(err => console.log(err));
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('cars')
    .where('id', id)
    .first()
    .then(cars => {
        res.status(200).json({ data: cars})
    })
    .catch(err => console.log('Error finding id'));
});

router.post('/', (req, res) => {
    const carsData = req.body;
    db('cars')
    .insert(carsData)
    .then(res.status(201).json({ data:carsData }))
    .catch(err => console.log('Error creating car post'));
});

module.exports = router;