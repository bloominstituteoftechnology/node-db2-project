const express = require('express');
const db = require('../data/db-config');

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(car =>{
            res.status(200).json(car);
        })
        .catch(err => {
            res.status(500).json({message: 'error retrieving data'})
        })
});

router.get('/:id',(req, res)=>{
    const {id} = req.params;

    db('cars')
        .where({id})
        .then((car) => res.status(200).json(car))
        .catch((err)=>{
            res.status(500).json({message: "error retrieving account with Id", err})
        });
});

router.post('/',(req,res) =>{
    const carsData = req.body;
    db('cars')
    .insert(carsData)
    .then((cars)=> res.status(200).json(carsData))
    .catch((err)=> res.status(500).json({message: "failed to add car", err}));
});


module.exports = router;