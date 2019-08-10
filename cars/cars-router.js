const express = require('express');

const db = require('../data/db-config.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const cars = await db('cars');
    res.json(cars);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Failed to retrieve cars.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const car = await db('cars').where({ id });
    res.json(car);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Failed to retrieve car.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const carData = req.body;
    const [id] = await db('cars').insert(carData);
    const newCar = await db('cars').where({ id });
    res.status(201).json(newCar);
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Failed to store car data.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  try {
    const count = await db('cars')
      .where('id', '=', id)
      .update(changes);
    if (count) {
      res.status(200).json({ update: count });
    } else {
      res.status(404).json({ message: `Could not find vehicle ${id}` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Failed to modify vehicle info.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const count = await db('cars')
      .where({ id })
      .del();
    if (count) {
      res
        .status(200)
        .json({ deleted: count, message: 'Vehicle has been deleted.' });
    } else {
      res.status(404).json({ message: `Could not find vehicle ${id}` });
    }
  } catch (err) {
    res
      .status(500)
      .json({ err: err.message, message: 'Failed to delete vehicle!' });
  }
});

module.exports = router;
