const router = require('express').Router();
const db = require('../data/db-config.js')
router.get('/', async (req, res) => {
    try {
        cars = await db('cars')
        if(cars){
            res.status(200).json(cars)
        }
    }
    catch(error){
        res.status(500).json({message: `error in retrieving all cars`})
    }
})

module.exports = router;