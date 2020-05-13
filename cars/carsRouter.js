const express = require('express');

const db = require('../data/dbConnection')

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.status(200).json({ data: cars}); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

router.post('/', (req, res) => {
  const carData = req.body;
  db('cars')
  .insert(carData, "*")
  // .then(newCar => {
  //     res.status(201).json({message: "car created"});
  // })
  .then(([car]) => {
    res.status(201).json(car);
})
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
});

module.exports = router;