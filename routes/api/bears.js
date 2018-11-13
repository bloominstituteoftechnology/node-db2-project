const express = require('express');
const knex = require('knex');

const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

const router = express.Router();

// POST a new zoo
router.post('/', (req, res) => {
  const name = req.body;
  db.insert(name)
    .into('bears')
    .then(id => {
      res.status(201).json(id[0]);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong.' });
    });
});

// GET Zoos
router.get('/', (req, res) => {
  db.select('*')
    .from('bears')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET ALL Zoos
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.select('*')
    .from('bears')
    .where({ id })
    .then(zoo => {
      res.status(200).json({ ...zoo[0] });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// UPDATE Zoo Name
router.put('/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('bears')
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE Zoo
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('bears')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
