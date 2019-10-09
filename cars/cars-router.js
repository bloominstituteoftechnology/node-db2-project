const express = require('express');
const db = require("../data/db-config");
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
        .then(cars => {
            res.json(cars);
        })
        .catch(err => {
            console.warn("Get failed...", err)
            res.status(500).json({message : 'Failed to find cars, check console.'});
        })
})
router.post('/', (req, res) => {
    const carData = req.body;
    db('cars').insert(carData)
     .then(ids => {
         db('cars').where({ id : ids[0]})
         .then(newCarEntry => {
             console.log("Stored data.")
             res.status(201).json(newCarEntry);
         });
     })
     .catch(err => {
         console.warn("Post failed...", err)
         res.status(500).json({ message: "Failed to store data, check console."})
     })
})