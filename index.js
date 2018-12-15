const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/animals', (req, res) => {
  const animal = req.body;
  db('zoos').insert(animal)
    .then(animalsId => {
      res.status(201).json(animalsId);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to insert animal' })
    });
});

server.get('/api/animals', (req, res) => {
  db('zoos')
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to get animals' })
    });
});

server.get('/api/animal/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where('id', id)
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to get animal' })
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
