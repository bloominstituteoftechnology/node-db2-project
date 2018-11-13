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
  res.json({ api: 'api running' });
});

server.get('/api/zoos', (req, res) => {
  db('zoos').get(req.params.id)
  .then(zoos => res.status(200).json(zoos))
  .catch(error => res.status(500).json({message: 'error getting names'}))
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where({ id: id })
  .then(zoos => res.status(200).json(zoos))
  .catch(error => res.status(500).json({message: 'error getting names'}))
})

server.post('/api/zoos', (req, res) => {
  const name = req.body;
  db('zoos')
  .insert(name)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => res.status(500).json({message: 'Error adding name'}))
})

server.put('/api/zoos/:id', (req, res) => {
  db('zoos')
  const changes = req.body;
  const { id } = req.params;
  db('zoos')
  .where({ id: id })
  .update(changes)
  .then(count => {
    res.status(200).json({ count })
  })
  .catch(error => res.status(500).json({ message: 'Error updating name'}))
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
