const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(err => res.status(500).json({
        message: 'Failed to retreive cars'
    }))
});

router.post('/', (req, res) => {
    const carData = req.body;
    db('cars').insert(carData)
    .then(car => {
        db('cars').where({ id: car[0] })
        .then(newCar => {
            res.status(201).json(newCar);
        });
    })
    .catch (err => res.status(500).json({ message: 'Failed to add car' }))
});

router.get('/:id', (req, res) => {
    db.select('*').from('cars').where('id', '=', req.params.id).first()
    .then(car => res.status(200).json(car))
    .catch(err => res.status(500).json({ message: 'Failed to get car' }))
})

router.put('/:id', (req, res) => {
    db('cars').where({id: req.params.id}).update(req.body)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(err => res.status(500).json({ message: 'Failed to update car' }))
})

router.delete('/:id', (req, res) => {
    db('cars').where({id: req.params.id}).delete()
    .then(car => res.status(200).json(car))
    .catch(err => res.status(500).json({ message: 'Failed to delete car' }))
})

module.exports = router; 