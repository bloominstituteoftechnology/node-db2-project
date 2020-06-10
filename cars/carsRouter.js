const express = require('express');

const db = require('../connection');

const router = express.Router();

router.get('/', (req,res) => {
  db('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      console.log('GET /', err);
      res.status(500).json({ error: "Could not retrieve cars" });
    })
});

router.post('/', (req,res) => {
  const { id } = req.params;
  db('cars')
    .insert(req.body)
    .then(car => {
      res.status(201).json(req.body);
    })
    .catch(err => {
      console.log('POST /', err);
      res.status(500).json({ error: "Car listing could not be created" });
    })
});

router.put('/:id', (req,res) => {
  const { id } = req.params;
  db('cars')
    .where({ id })
    .update(req.body)
    .then(car => {
      res.status(200).json({ message: "Car info updated" });
    })
    .catch(err => {
      console.log('PUT /:id', err);
      res.status(500).json({ error: "Error occurred when updating the car info" });
    })
});

router.delete('/:id', (req,res) => {
  const { id } = req.params;
  db('cars')
    .where({ id })
    .del()
    .then(car => {
      res.status(200).json({ message: "Car was removed" });
    })
    .catch(err => {
      console.log('DELETE /:id', err);
      res.status(500).json({ error: "Unable to remove the car" });
    })
});

module.exports = router;