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

router.get('/:id', function getCars(req,res){
    const {id} = req.params;
    Cars.getById(id)
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

router.put('/:id',function updateCar(req,res){
    const {id} = req.params;
    const changes = req.body;
    Cars.update(id,changes)
    .then((car)=>{
        res.status(200).json(changes)
    })
    .catch((error)=>{
        res.status(400).json({error:error.message})
    })
})

router.delete('/:id',function deleteCar(req,res){
    const {id} = req.params;
    Cars.remove(id)
    .then((car)=>{
        res.status(200).json("Car deleted")
    })
    .catch((error)=>{
        res.status(500).json({error:error.message})
    })
})

module.exports = router;