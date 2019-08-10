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

    }
    catch (err) {


    }
})

carRouter.put('/:id' , async (req,res) => {
    try {

    }
    catch (err) {

    }
})

carRouter.delete('/:id' , (req,res) => {
    try {

    }
    catch (err) {

    }
})

module.exports = carRouter;