const express = require('express');

const carRouter = express.Router();
const db = require('../data/db-config');

carRouter.get('/' , async (req,res) => {
    try {
        const carsTotal = await db('cars');
        res.status(200).json(carsTotal);
    }

    catch (err) {
        res.status(500).json({message:'There was a problem with your request'});
    }
})

carRouter.post('/' , async (req,res) => {
    try {
        const dataBody = req.body;
        const newCar = await db('cars').insert(dataBody);
        res.status(200).json(newCar);
    }
    catch (err) {
        res.status(500).json({message: `There was a problem with your POST request`});
    }
})

carRouter.put('/:id' , async (req,res) => {
    try {
        const updateCar = req.body;
        const id = req.params.id;
        const updatedCar = await db('cars').update(updateCar).where('id' , '=' , id);
        res.status(203).json(updatedCar);
    }
    catch (err) {
        res.status(500).json({message: 'There was a problem with your PUT request'});
    }
})

carRouter.delete('/:id' , async (req,res) => {
    try {
        const id = req.params.id;
        const carDeleted = await db('cars').del().where('id' , '=' , id);
        res.status(200).json(carDeleted);
    }
    catch (err) {
        res.status(500).json({message:'There was a problem with your DELETE request'})
    }
})

module.exports = carRouter;