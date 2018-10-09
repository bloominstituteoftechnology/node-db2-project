const express = require('express');

const bear = require('./bearsModels.js');

const router = express.Router();

// get a list of Bears
router.get('/', (req, res) => {
    bear 
    .find()
    .then(bear => {
      res.status(200).json(bear );
    })
    .catch(err => res.status(500).json(err));
});

// get a Bear by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const bearName = await bear .findById(id);

    if (bearName  ) {
      res.status(200).json(bearName  );
    } else {
      res.status(404).json({ message: 'Animal name not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// create Bears
router.post('/', (req, res) => {
  const bearName   = req.body;

  bear 
    .add(bearName  )
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// update Bears
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  bear 
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

// delete Bears
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  bear 
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
