const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
// POST /api/zoos
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
    .then(ids => {
      res
        .status(201)
        .json(ids);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: 'failed to insert zoo' });
    });
});

// GET /api/zoos
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(rows => {
      res
        .json(rows);
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: 'failed to find zoos' });
    });
});

// GET /api/zoos/:id
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where('id', id)
    .then(rows => {
      res
        .json(rows)
    })
    .catch(err => {
      res
        .status(500)
        .json({ err: 'failed to find zoo' });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
