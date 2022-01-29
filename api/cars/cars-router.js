const router = require('express').Router()
const Car = require('./cars-model')
const {
    checkCarId,
    checkVinNumberUnique,
    checkCarPayload,
    checkVinNumberValid,
} = require('./cars-middleware')

router.get('/', async (req, res, next) => {
   try{
    const cars = await Car.getAll()
    res.json(cars)
   }catch(err){
    next(err)
   }
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.json(req.car)
})
module.exports = router