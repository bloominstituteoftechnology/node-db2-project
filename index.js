const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(animals => res.status(201).json(animals))
    .catch(error => res.status(500).json({ message: "The animals escaped!", error }))
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
    .where({ id })
    .then(animal => res.status(201).json({ animal }))
    .catch(error => res.status(500).json({ message: `Could Not Find Your ${animal}`, error }))
});

server.post('/api/zoos', (req, res) => {
  const animal = req.body
  db('zoos').insert(animal)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(error => res.status(500).json({ message: `What is this ${animal} thing?`, error }))
});

server.put('/api/zoos/:id', (req, res) => {
  
});

server.delete('/api/zoos/:id', (req, res) => {
  
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
