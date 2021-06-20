const express = require ('express')
const Car = require('./cars-model')

const router = express.Router()

//MIDDLEWARE
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require('./cars-middleware');
//

router.get('/',async(req,res,next)=>{
    try{
        const data = await Car.getAll()
        res.json(data)
    } catch (err) {
     next(err)    
    }
})

router.get('/:id', checkCarId, async (req,res,next)=>{
    try{
        const data = await Car.getById()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkCarPayload, async (req,res,next)=>{
    try {
        const data = await Car.create()
        res.json(data)
    } catch(err) {
        next(err)
    }
})

router.put('/:id', checkCarPayload, checkCarId, async (req,res,next)=>{
    try {
        const data = await Car.update()
        res.json(data)
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', checkCarId, async (req,res,next)=>{
    try {
        const data = await Car.remove()
        res.json(data)
    } catch (err) {
        next(err)
    }
})
