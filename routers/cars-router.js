const express = require('express');
const database = require('../data/config');
const {validateUserId} = require('../middleware/carsMiddleware');
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const cars = await database.select('*').from('car-dealer');
        return res.status(200).json(cars);
    } catch(error){
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        return res.status(200).json(await validateUserId(req.params.id))
    } catch(error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        if(Object.keys(req.body) === 0){
            return res.status(404).json({
                errorMessage: "Please input the car info"
            })
        } else if(!req.body.VIN) {
            return res.status(404).json({
                errorMessage: "Please input the car VIN"
            })
        } else if(!req.body.make){
            return res.status(404).json({
                errorMessage: "Please input the car make"
            })
        } else if(!req.body.model){
            return res.status(404).json({
                errorMessage: "Please input the car model"
            })
        }
            const [id] = await database("car-dealer").insert(req.body);
            const newCar = await database("car-dealer").where({ id }).first();
            return res.status(200).json(newCar);
    } catch(error){
        next(error)
    }
})

module.exports = router;
