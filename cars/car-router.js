const express = require('express');

const { getCars , getCarById } = require('./car-model');
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

module.exports= router;