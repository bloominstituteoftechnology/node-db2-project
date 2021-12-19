const router = require('express').Router()
const Cars = require('./cars-model')
const mw = require('./cars-middleware')

router.get('/', async (req, res, next) => {
    try{
        const cars = await Cars.getAll()
        res.json(cars)
    }catch(err){
        next(err)
    }
})

router.get('/:id', mw.checkCarId, async (req, res) => {
    const car = await Cars.getById(req.params.id)
    res.json(car)
})

router.post('/', mw.checkCarPayload, mw.checkVinNumberUnique, mw.checkVinNumberValid, async (req, res, next) => {
    try{
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    }catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => {
    res.status(err.status || 404).json({message: err.message})
})

module.exports = router