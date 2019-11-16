const express = require('express');
const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
    .then( cars => {
      res.json(cars);
    })
    .catch( err => {
      res.status(500).json({ message: 'Failed to retrieve cars' });
    });
});

router.post('/', async (req, res) => {
  const carData = req.body;
  console.log(carData);

  try {
    const id = await db('cars').insert(carData);
    const newCarEntry = await db('cars').where( 'VIN', carData.VIN );
    res.status(201).json(newCarEntry);
  } catch(error) {
    console.log('Post error', error);
    res.status(500).json({ message: 'Failed to store data', error });
  }
});

module.exports = router;
