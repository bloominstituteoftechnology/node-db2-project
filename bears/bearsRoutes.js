const express = require('express');

const bears = require('./bearsModel.js');

const router = express.Router();

// endpoints here

  router.post('/', (req, res) => {
    const { name } = req.body;
    const bear = { name };
  
    bears
    .add(bear)
    .then(ids => {
      res.status(201).json(ids[0])
    })
    .catch(err => {
      res.status(500).json(err);
    });
  });
  
  router.get('/', (req, res) => {
    bears
    .find()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const bear = await bears.findById(id);
      
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: 'bear not found' })
      }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    bears

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
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    bears
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