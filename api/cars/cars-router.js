const express = require('express');
const router = express.Router();
const Cars = require('./cars-model');

const{
    checkCarId, 
    checkCarPayload, 
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware')

router.get('/', (req, res, next) => {
    return "get request wired/fired";
});

router.get('/:id', (req, res, next) => {
    return "get cars by id wired/fired";
});

router.post('/', (req, res, next) => {
    return "post cars wired/fired";
});

router.put('/:id', (req, res, next) =>{
    return "PUT with id wired/fired";
});

router.delete('/:id', (req, res, next) => {
    return "delete wired/fired";
});

module.exports = router;