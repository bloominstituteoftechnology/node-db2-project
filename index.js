const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const name = req.body;
  db('zoos').insert(name)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to add animal' })
    })
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to find animals' })
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where('id', id)
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ error: 'Invalid ID' })
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where('id', id).delete()
    .then(rowCount => {
      res.json(rowCount)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete animal' })
    })
})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;

  db('zoos').where('id', id).update(name)
    .then(rowCount => {
      res.status(201).json(rowCount)
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update animal' })
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
