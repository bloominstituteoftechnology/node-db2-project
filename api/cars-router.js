const express = require('express');
const db = require('../data/dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
db('cars')
.then(cars => {
res.status(200).json(cars)    
})
.catch(error => {
    res.status(500).json(error.message)
})
})

router.post('/', (req,res) => {
const carsData = req.body; 
db('cars').insert(carsData)
.then(ids => {
    return db('cars').where({id: ids[0]})
})
.then(newCarEntry => {
    res.status(201).json(newCarEntry)
})
.catch(err => {
    console.log('POST error', err.message)
    res.status(500).json({message: `Failed to store data because: ${err.message}`})
})
})

module.exports = router;