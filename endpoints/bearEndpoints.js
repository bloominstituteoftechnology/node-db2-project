const express = require('express');
const knex = require('knex');
const knexConfig = require('../knexfile.js');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
    db('bears')
    .then(bears => {
      res.json(bears)
    })
    .catch(err => res.status(500).json({message: 'Error displaying data'}))
  });
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('bears')
    .where({ id })
    .then(bears => {
      res.json(bears)
    })
    .catch(err => res.status(500).json({message: 'Error displaying data'}))
  });
  
  router.post('/', (req, res) => {
    const zoo = req.body;
    db('bears').insert(zoo).then(id => {
      res.status(201).json(id)
    }).catch(err => res.status(500).json({message: 'Error posting zoo'}))
  });
  
  router.put(':id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db('bears')
    .where({ id })
    .update(changes)
    .then(count => {
      res.json({ count })
      
    })
    .catch(err => res.status(500).json(err))
  })
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    db('bears')
    .where({ id })
    .del()
    .then(count => {
      res.json({ count })
    })
    .catch(err => res.status(500).json(err))
  })

  module.exports = router;