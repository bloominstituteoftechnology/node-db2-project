// DO YOUR MAGIC
const express = require('express')
const carModel = require('../cars/cars-model.js');
const ExpressError = require('../ExpressError.js');
const router = require('express').Router();
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware.js');

router.get('/', async (req, res, next) => {
    try{
        const cars = await carModel.getAll();
        res.status(200).json(cars);
    }
    catch(err) {
        next(new ExpressError(err, 500))
    }
})

// router.get('/:id', checkCarId, async (req, res, next) => {
//     try{
//         res.status(200).json(req.params.id)
//     }
//     catch(error){
//         next(new ExpressError(err, 500))
//     }
// })


module.exports = router ;
