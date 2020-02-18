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
    const { id } = req.params;
    db('cars')
    .where({ id })
    .first()
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

router.put('/:id', (req, res) => {
    const id = req.params.id
    const changes = req.body
    db('cars')
    .where({ id })
    .update(changes)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: 'Failed to update the car' })
    })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db('cars')
    .where({ id })
    .del()
    .then(del => {
        res.status(200).json(del)
    })
    .catch(err => {
        res.status(500).json({ error: 'Failed to remove the car' })
    })
});

module.exports = router;