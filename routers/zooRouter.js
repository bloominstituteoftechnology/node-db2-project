const express = require('express');

const knex = require('knex');

const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.post('/', (req, res) => {
    const zoo = req.body;
  
    db('zoos')
      .insert(zoo)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        res.status(500).json({ message: 'Error creating zoo', err });
      });
  });
  
  router.get('/', (req, res) => {
    db('zoos')
      .then(zoos => res.status(200).json(zoos))
      .catch(err => res.status(500).json({ message: 'could not get zoos', err }));
  });
  
  router.get('/:id', (req, res) => {
    db('zoos')
      .where({ id: req.params.id })
      .then(zoos => res.status(200).json(zoos))
      .catch(err => res.status(500).json({ message: 'could not get zoo', err }));
  });
  
  router.put('/:id', (req, res) => {
    const changes = req.body;
    /* This will work as well
    const { id } = req.params;
    db('zoos')
      .where({ id })
    */
    db('zoos')
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ message: 'could not update zoo', err }));
  });
  
  router.delete('/:id', (req, res) => {
    /* This will work as well
    const { id } = req.params;
    db('zoos')
      .where({ id })
    */
    db('zoos')
      .where({ id: req.params.id })
      .del()
      .then(count => {
        res.status(200).json({ count });
      })
      .catch(err => res.status(500).json({ message: 'could not delete zoo', err }));
  });

  module.exports = router;