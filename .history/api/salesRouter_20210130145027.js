const express = require("express");

const router = express.Router();

//imported db
const dbDealer = require('../data/dbDealer');

//imported dbSales
const dbSales = require('../data/dbSales');


router.get('/', (req, res, next)=>{
    res.status(200).json({message: `Hello from root sales`})
})

router.post('/sell', async (req, res, next)=>{

    const sellThis = await dbSales.sell(req.body)
    if (sellThis){
        res.status(200).json(sellThis)
    }else{
        res.status(400).json({message: `Something went wrong`})
    }
})

//middleware

const validateVIN = function(){

    return async (req, res, next)=>{
        const validate = await dbDealer.getByID(req.params.id)
        
        next();
    }
}

module.exports = router