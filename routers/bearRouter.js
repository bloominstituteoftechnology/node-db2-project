const express = require('express');

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.post('/', (req, res) => {
    const bear = req.body;
  
    db('bears')
      .insert(bear)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error creating bear', err });
      });
  });
  
  router.get('/', (req, res) => {
    db('bears')
      .then(bears => res.status(200).json(bears))
      .catch(err => res.status(500).json({ message: 'could not get bears', err }));
  });
  
  router.get('/:id', (req, res) => {
    db('bears')
      .where({ id: req.params.id })
      .then(bears => res.status(200).json(bears))
      .catch(err => res.status(500).json({ message: 'could not get bear', err }));
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    const { id } = req.params;
    
    db('bears')
      .where({ id })
      .update(changes)
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ message: 'could not update bear', err }));
  });
  
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    
    db('bears')
      .where({ id })
      .del()
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ message: 'could not delete bear', err }));
  });

  module.exports = router;