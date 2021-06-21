// DO YOUR MAGIC
const express = require('express')
const car = require('./cars-model')
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
}= require('./cars-middleware')
const router = express.Router()

router.get('/', async (req,res,next) => {
    try{
     const cars = await car.getAll()
     res.json(cars)
    }catch (err){
     next(err)
    }
})
router.get('/:id',checkCarId, async (req,res,next) => {//eslint-disable-line
    res.json(req.car)
})
router.post(
    '/',
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
     async (req,res,next) => {
        try{
            const car = await car.create(req.body)
            res.json(car)
           }catch (err){
            next(err)
           }
})

module.exports = router

