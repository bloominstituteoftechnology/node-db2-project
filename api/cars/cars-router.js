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

router.post('/', 
checkCarPayload,
checkVinNumberUnique,
checkVinNumberValid,
async (req, res, next) => {
    try{
        const newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    }catch(err){
        next(err)
    }
})

router.put('/:id', 
checkCarId, 
checkCarPayload,
async (req, res, next) => {
    try{
        const updatedCar = await Car.updateById(req.params.id, req.body)
        res.status(200).json(updatedCar)
    }catch(err){
        next(err)
    }
})

router.delete('/:id', checkCarId, (req, res, next) => {
    Car.deleteById(req.params.id)
    .then(deletedCar => {
        res.status(200).json(deletedCar)
    })
    .catch(err => {
        next(err)
    })
})

router.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  });
module.exports = router