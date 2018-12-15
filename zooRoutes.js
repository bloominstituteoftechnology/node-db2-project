const express = require('express');

// const dbConfig = require('./knexfile');

// const knex = require('knex');
// const db = knex(dbConfig.development);

const zooDb = require('./zooModal');

const router = express.Router();

router.get('/', (req, res) => {
  //   db('zoos')
  zooDb
    .find()
    .then(zoos => {
      res.json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  //   db('zoos')
  //     .where({ id })
  //     .first()
  zooDb
    .findById(id)
    .then(zoo => {
      if (zoo) {
        res.json(zoo);
      } else {
        res.status(404).json({ error: `Zoo with the id of ${id} not found.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  const zoo = req.body;
  //   db('zoos')
  //     .insert(zoo)
  zooDb
    .create(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  //   db('zoos')
  //     .where({ id })
  //     .update(changes)
  zooDb
    .update(id, changes)
    .then(count => {
      if (count) {
        res.status(201).json(count);
      } else {
        res
          .status(404)
          .json({ error: `zoo with the id of ${id} could not be found.` });
      }
    })
    .catch(err => res.status(500).json(err));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  //   db('zoos')
  //     .where({ id })
  //     .del()
  zooDb
    .remove(id)
    .then(count => {
      if (count) {
        res.json(count);
      } else {
        res.status(404).json({ error: 'Zoo could not be found.' });
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;
