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

  try {
    const ids = await db('cars').insert(carData);
    const newCarEntry = await db('cars').where({ id: ids[0] });
    res.status(201).json(newCarEntry);
  } catch(error) {
    console.log('Post error', error);
    res.status(500).json({ message: 'Failed to store data', error });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const carChanges = req.body;

  try {
    const count = await db('cars').where({ id }).update(carChanges);

    if( count > 0 ) {
      const updatedCarEntry = await db('cars').where({ id });
      res.status(201).json(updatedCarEntry);
    } else {
      res.status(404).json({ message: 'Car data was not updated' });
    }
  } catch (error) {
    console.log('Put error', error);
    res.status(500).json({ message: 'Failed to update data', error });
  }

});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const count = await db('cars').where({ id }).del();
    if( count > 0) {
      res.status(200).json({ message: 'Car data successfully deleted' });
    } else {
      res.status(404).json({ message: 'Failed to delete car data' });
    }
  } catch(err) {
    console.log('Delete error', error);
    res.status(500).json({ message: 'Failed to delete data', error });
  }

});

module.exports = router;
