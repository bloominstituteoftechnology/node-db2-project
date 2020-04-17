const express = require('express');
const db = require('../data/db-config.js');



const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cars').where({ id }).first()
  .then(car => {
    res.json(car);
  }) 
  .catch (err => {
    res.status(500).json({ message: 'Failed to retrieve id' });
  });
});

router.post('/', (req, res) => {
  const make = req.body;
  db('cars').insert(make)
  .then(ids => {
    db('cars').where({ id: ids[0] })
    .then(newCarsMakeEntry => {
      res.status(201).json(newCarsMakeEntry);
    });
  })
  .catch (err => {
    console.log('POST error', err);
    res.status(500).json({ message: "Failed to store data" });
  });
 });

module.exports = router;