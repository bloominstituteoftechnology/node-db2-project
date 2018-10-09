const express = require('express');

const zoo = require('./zoosModels.js');

const router = express.Router();

// get a list of Animals
router.get('/', (req, res) => {
    zoo
    .find()
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => res.status(500).json(err));
});

// get an Animal by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const animalName = await zoo.findById(id);

    if (animalName ) {
      res.status(200).json(animalName );
    } else {
      res.status(404).json({ message: 'Animal name not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create Animals
router.post('/', (req, res) => {
  const animalName  = req.body;

  zoo
    .add(animalName )
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

  zoo
    .update(id, changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No Animal name found to update' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

// delete Animals
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  zoo
    .remove(id)
    .then(count => {
      if (!count || count < 1) {
        res.status(404).json({ message: 'No Animal name found to delete' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
