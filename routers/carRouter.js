const express = require('express');

const router = express.Router();

const db = require('../data/db-config');

router.get('/', (req, res) => {
  db('cars')
    .then( cars => {
      res.status(200).json(cars)
    })
    .catch( err => {
      res.status(500).json({error: err})
    })
})

router.post('/', (req, res) => {
  const carData = req.body;

  db('cars').insert(carData).into('cars')
    .then( cars => {
      res.status(201).json(cars)
    })
    .catch( err => {
      res.status(500).json({error: err})
    })
})

module.exports = router;