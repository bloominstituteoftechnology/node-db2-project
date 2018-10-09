const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// GET ENDPOINTS FOR ZOO'S

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// POST ENDPOINTS FOR ZOO'S

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (!zoo) {
    res.status(500).json({ error: 'Please include a body.' });
  } else {
    db.insert(zoo)
      .into('zoos')
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => res.status(500).json(err));
  }
});

const port = 6000;

server.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
