const express = require('express');
const validateID = require('../auth/validateID');
const validateNewCar = require('../auth/validateNewCar')

const db = require('../../data/db-config');

const router = express.Router();

// POST requests
router.post('/', validateNewCar, (req, res) => {
    const newCar = req.body;
    db('cars')
    .insert(newCar)
    .then(car => {
        console.log(car);
        res.status(200).json({ success: "This car has been added"});
    })
    .catch(err => res.status(500).json(err))
});

// GET requests
router.get('/', (req, res) => {
    db('cars')
    .select('*')
    .then(cars => res.status(200).json(cars))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', validateID, (req, res) => {
    db('cars')
    .select('*')
    .where({ id: req.params.id })
    .first()
    .then(car => res.status(200).json({car}))
    .catch(err => res.status(500).json(err))
})

// PUT request
router.put('/:id', validateID, (req, res) => {
    db('cars')
    .where({ id: req.params.id })
    .update(req.body)
    .then(changes => res.status(200).json({ success: "This car has been updated"}))
    .catch(err => res.status(500).json(err))
})

// DELETE request
router.delete('/:id', validateID, (req, res) => {
    db('cars')
    .where({ id: req.params.id })
    .del()
    .then(account => res.status(200).json({ success: "This car has been deleted." }))
    .catch(err => res.status(500).json(err))
})

module.exports = router;