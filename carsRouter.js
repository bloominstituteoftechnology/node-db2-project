const express = require('express');
const knex = require('knex');
const db = require('./data/db-config.js')

const router =express.Router();

router.get('/', async (req,res)=> {
    try{
        const cars =await db('vehicles');
        res.json(cars);

    }catch(err){
        res.status(500).json({message: 'Failed to retrieve cars'})
    }
})


router.get('/:id', async(req,res)=>{
    try{
        const {id} =req.params;
        const cars = await db('vehicles').where({id});

        res.json(cars);
    }catch(err){
        res.status(500).json({message: 'Failed to retrieve car.'})
    }
})

router.post('/', async(req,res)=>{
    try{
    const carData = req.body;
    const [id]= await db('vehicles').insert(carData);
    const newCarEntry = await db('vehicles').where({id});

    res.status(201).json(newCarEntry);
}catch(err){
    console.log('POST error:', err);
    res.status(500).json({message: 'Failed to store data'})
}
});
module.exports =router;