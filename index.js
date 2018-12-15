const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/animals', (req, res) => {
  const animal = req.body;
  db('zoos').insert(animal)
    .then(animalsId => {
      res.status(201).json(animalsId);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Failed to insert animal' })
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
