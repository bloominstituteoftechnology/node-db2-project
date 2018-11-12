const express = require('express');

const router = express.Router();

const db = require('./data/db');

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ message: 'Couldnt find zoos' }));
});

router.post('/', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    .then(ids => res.status(201).json(ids))
    .catch(err => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
  const zoo = req.body;
  const { id } = req.params;
  db('zoos')
    .where({ id: id })
    .update(zoo)
    .then(ids => res.status(201).json(ids))
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id: id })
    .del()
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json({ message: 'No user on that id' }));
});

module.exports = router;
