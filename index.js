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
    .then(zoo => res.status(201).json({ zoo }))
    .catch(error => res.status(500).json({ message: `Could Not Find The Animal With An ID Of ${id}`, error }))
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
  const changes = req.body;
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json( { count } )
    })
    .catch(error => res.status(500).json({ message: 'No Changes could be made', error }))
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(err => res.status(500).json(err))
});

server.get('/api/bears', (req, res) => {
  db('bears')
    .then(bears => res.status(201).json({ bears }))
    .catch(error => res.status(500).json({ message: 'The Bears Escaped!', error }))
});

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params
  db('bears')
    .where({ id })
    .then(bear => res.status(200).json({bear}))
    .catch(error => res.status(500).json({ message: 'That Bear Is Not At This Zoo', error }))
});

server.post('/api/bears', (req, res) => {
  const bear = req.body
  db('bears')
    .insert(bear)
    .then(bear => res.status(200).json({bear}))
    .catch(error => res.status(500).json(error))
});

server.put('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db('bears')
    .where({id})
    .update(changes)
    .then(bear => res.status(201).json({bear}))
    .catch(error => res.status(501).json({message: error}))
});

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params
  db('bears')
    .where({id})
    .del()
    .then(count => res.status(200).json({count}))
    .catch(error => res.status(500).json({ message: error }))
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
