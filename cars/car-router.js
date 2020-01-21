const express = require('express');

const { getCars , getCarById, addNewCar } = require('./car-model');
const router = express.Router();

router.get('/', async(req, res)=>{
   try{
    const cars = await getCars();
    res.status(200).json(cars);
   }
   catch(error){
    res.json({error: error.message});
   }
    
})

router.get('/:id', async (req,res)=>{
    try{
        const {id} = req.params;

        const car = await getCarById(id);
        res.status(200).json(car)
    }
    catch(error){
        res.json({error: error.message});
    }
})
router.post('/', async(req, res)=>{
    try{
        const {VIN, make, model, milleage, transmission, status} = req.body;
    const id = await addNewCar({VIN, make, model, milleage, transmission, status});
    res.status(200).json(`Car with id ${id} was created`)
    }
    
    catch(error){
        res.status(404).json({error: "Car not found"});
    }
})

module.exports= router;