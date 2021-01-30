const Cars = require('./cars-model');
const express = require('express')

const router = express.Router();

router.get('/', function getCars(req,res){
    Cars.get()
    .then((cars)=>{
        res.status(200).json(cars)
    })
    .catch((error)=>{
        res.status(500).json({error:error.message})
    })
});

router.post('/',function createCar(req,res){
    const newCar = req.body;
    Cars.create(newCar)
    .then((cars)=>{
        res.status(201).json(newCar)
    })
    .catch((error)=>{
        res.status(500).json({error:error.message})
    })
})

module.exports = router;