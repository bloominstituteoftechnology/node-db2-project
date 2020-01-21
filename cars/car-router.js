const express = require('express');

const {getCars} = require('./car-model');
const router = express.Router();

router.get('/', async(req, res)=>{
   try{
    const cars = await getCars();
    res.status(200).json(`Cars were fetched`);
   }
   catch(e){
       console.log(e)
   }
    
})


module.exports= router;