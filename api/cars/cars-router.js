// DO YOUR MAGIC
const router = require('express').Router();
const Cars = require('./cars-model');

router.post('/', (req, res,) => {
    try {
        const newCar = Cars.create(req.body)
        res.status(201).json(newCar)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;