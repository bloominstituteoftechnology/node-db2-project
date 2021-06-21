// DO YOUR MAGIC
const router = require('express').Router()

const { checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware')

const db = require('./cars-model')
//gotta remember that I only called this DB in this project... One of my problems in the sprint :(

router.get('/api/cars', async (req, res, next) => {
      //Gonna be using try catch from now on as pointed out in my last sprint lol
      try{
            const cars = await db.getAll
            res.status(200).json(cars)
      }catch(err){
            next(err)
      }
})

router.get('/api/cars/:id', async (req, res, next) => {
      try{
            const car = await db.getById(req.car.id)
            res.status(200).json(car)
      }catch(err){
            res.status(404).json({message: 'Could not retrieve ID'})
      }
})

router.post('/api/cars', checkCarPayload(),  async (req, res, next) => {
      try{
            const car = await db.create(req.body)
            res.status(200).json(car)
      }catch(err){
            next(err)
      }
})

router.use((err, req, res, next) => {
      console.log(err);

      res.status(500).json({message: 'idek what went wrong bro, try again?'})
})

module.exports = router