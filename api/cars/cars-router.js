const express = require('express')
const db = require('../../data/dbConfig')

const router = express.Router()

router.get('/', (req, res) =>{
    db('cars')
    .then((cars) =>{
        res.status(200).json(cars)
    })
    .catch((err) => {
        res.status(500).json({ message: 'Failed to retrieve cars' });
    });
})

router.get('/:id', (req, res) =>{
    const { id } = req.params

    db('cars').where({ id }).first()
    .then((car) =>{
        res.status(200).json(car)
    })
    .catch((err) => {
        res.status(500).json({ message: 'Failed to retrieve car' });
    });
})

router.post('/', (req,res) =>{
    const carData = req.body
    db('cars').insert(carData)
    .then((ids) =>{
        return db('cars').where({ id: ids[0]})
    })
    .then((newCarEntry) =>{
        res.status(201).json(newCarEntry)
    })
    .catch((err) =>{
        res.status(500).json({message: 'Failed to add car data'})
    })
})

module.exports =router