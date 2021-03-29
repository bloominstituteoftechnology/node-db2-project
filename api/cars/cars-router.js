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

router.get('/:id', checkCarId, async (req, res, next) => {
    try{
        res.status(200).json(req.car)
    }
    catch(error){
        next(new ExpressError(err, 500))
    }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    req.body.name= req.body.name.trim();
    try{
        const newCar = await carModel.create(req.body);
        res.status(201).json(newCar);
    }
    catch(error){
        next(new ExpressError(err, 500))
    }
});


router.delete('/:id', checkCarId, async (req, res, next) => {
    try{
        await carModel.deleteById(req.params.id);
        res.status(204).send("");
    }
    catch(err) {
        next(new ExpressError(err, 500))
    }
})
module.exports = router ;
