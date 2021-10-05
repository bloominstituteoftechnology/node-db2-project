const router = require('express').Router();
const Cars = require('./cars-model');
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique
} = require('./cars-middleware');

router.get('/', async (req, res, next) => {
    try {
      const cars = await Cars.getAll();
      res.status(200).json(cars)  
    } catch (error) {
       next(error) 
    }
})
router.get('/:id', checkCarId, async (req, res, next) => {
    try {
       await res.status(200).json(req.car); 
    } catch (error) {
        next(error)
    }
})
router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    } catch (error) {
        next(error)
    }
})

router.use('/', (error, req, res, next) => { //eslint-disable-line
    res.status(error.status || 500).json({
        message: error.message
    })
})


module.exports = router;