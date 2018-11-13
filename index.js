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
  res.json({ api: 'up' });
});

server.get('/api/animals', (req, res) => {
  db('zoos')
  .then(zoos => res.status(200).json(zoos))
  .catch(error => res.status(500).json({message: 'error getting names'}))
})

server.post('/api/animals', (req, res) => {
  const name = req.body;
  db('zoos')
  .insert(name)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => res.status(500).json({message: 'Error adding name'}))
})




const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
