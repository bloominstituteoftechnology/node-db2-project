const express = require('express');

const ZooMod = require('./ZooModel.js');

const router = express.Router();

// get a list of animals
router.get('/', (req, res) => {
  ZooMod
    .find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// get a animal by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const zoo = await zoos.findById(id);

    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: 'Animal not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create animals
router.post('/', (req, res) => {
  const zoo = req.body;

  ZooMod
    .add(zoo)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update Animals
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  ZooMod
    .update(id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to update' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete courses
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  ZooMod
    .remove(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
