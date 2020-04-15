const express = require('express');
const knex = require('knex');

const KnexFile = require('../knexfile.js')

const db = knex(KnexFile.development)

const router = express.Router();

router.get('/', (req,res) => {
    db('cars')
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        res.status(500).json({error: 'error'})
    })
})

router.get('/:id', (req, res) => {
    const {id} = req.params

    db('cars')
    .where({id})
    .first()
    .then(car => {
        if(car){
            res.status(200).json(car)
        } else {
            res.status(404).json({message: 'That id was not found'})
        }
    })
    .catch(error => {
        res.status(500).json({error: 'error'})
    })
})

router.post('/', (req, res) => {
    const carData = req.body;
    console.log(carData);
    db('cars').insert(carData)
    .then(id => {
        db('cars').where({id: id[0]})
        .then(newCar => {
            res.status(201).json(newCar)
        })
    }).catch(error => {
        res.status(500).json({error: 'error'})
    })
})

module.exports = router;