// DO YOUR MAGIC
const express = require('express')
const Cars = require('./cars-model')
const router = express.Router()

router.get('/', async (req,res)=> {
  
    Cars.getAll()
        .then(cars => {
            res.status(200).json(cars)
        }).catch(err => {
            res.status(500).json({message:'error fetching all cars'})
        })
})

router.get('/:id', (req,res)=> {
    Cars.getById(req.params.id)
        .then(car => {
            if (!car) {
                res.status(404).json({message: `no car was found with id ${req.params.id}`})
            } else {
                res.status(200).json(car)
            }
        }).catch(()=> res.status(500).json({message:'error fetching car by id'}))
})

router.post('/',(req,res)=> {
    Cars.create(req.body)
        .then(car => {
            res.status(202).json(car)
        }).catch(()=> res.status(500).json({message: "error creating new car"}))
})

module.exports = router;