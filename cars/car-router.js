const express = require('express');

const { getCars , getCarById, addNewCar } = require('./car-model');
const router = express.Router();

router.get('/', async(req, res)=>{
   try{
    const cars = await getCars();
    res.status(200).json(cars);
   }
   catch(e){
       console.log(e)
   }
    
})

router.get('/:id', async (req,res)=>{
    try{
        const {id} = req.params;

        const car = await getCarById(id);
        res.status(200).json(car)
    }
    catch(e){
        console.log(e);
    }
})
router.post('/', async(req, res)=>{
    try{
        const {VIN, make, model, milleage, transmission, status} = req.body;
    const id = await addNewCar({VIN, make, model, milleage, transmission, status});
    res.status(200).json(`Car with id ${id} was created`)
    }
    catch(e){
        console.log(e);
    }
})

module.exports= router;