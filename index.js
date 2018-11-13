const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    .returning('id')
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error adding a zoo', err });
    });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then((zoos) => {
      res.status(200).json(zoos);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Could not get zoos', err });
    });
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .then((zoos) => {
      if (zoos.length) {
        res.status(200).json(zoos);
      } else {
        res.status(404).json({ message: 'Could not find zoo with that id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Could not find zoo with that id', err });
    });
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .del()
    .then((count) => {
      res.status(200).json({ count });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Could not delete zoo', err });
    });
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db('zoos')
    .where({ id })
    .update(changes)
    .then((count) => {
      if (count) {
        res.status(200).json({ count });
      } else {
        res.status(404).json({ message: 'Could not find zoo with that id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Could not update zoo', err });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
