// DO YOUR MAGIC
const express = require("express");
const Car = require("./cars-model.js");

const router = express.Router();


router.get('/', (req, res) => {
    Car.getAll(req.query)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Car.getById(id)
    .then(car => {
        res.status(200).json(car)
    })
    .catch(error => {
        res.status(500).json({ message: error.message })
    })
})


module.exports = router