const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ err }))
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => {
      res.status(500).json(err)
    })
});

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    // .returning('id')
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({ Message: 'Error inserting', err })
    })
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => {
      res.status(500).json({ Message: 'Error deleting', err })
    })
});

const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
