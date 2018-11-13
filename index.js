const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db('zoos')
    .insert(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:zooId', (req, res) => {
  const { zooId } = req.params;

  db('zoos')
    .where({ id: zooId })
    .then(zoo => {
      res.status(200).json({ zoo });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/zoos/:zooId', (req, res) => {
  const { zooId } = req.params;

  db('zoos')
    .where({ id: zooId })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/zoos/:zooId', (req, res) => {
  const changes = req.body;
  const { zooId } = req.params;

  db('zoos')
    .where({ id: zooId })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
