const router = require('express').Router();
const Cars = require('./cars-model');
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware');

router.get('/', (req, res, next) => {
    try {
        
    } catch (error) {
       next(error) 
    }
})
router.get('/:id', (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})
router.post('/', (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
})



