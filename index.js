const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const port = 3300;
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

server.post('/api/zoos', (req, res) => {
  const zoo = req.body.name;
  db('zoos')
    .insert(zoo)
    .then((id) => {
      res.status(201).json(id);
    })
    .catch((err) => {
      res.status(500).json({ err: 'Failed to insert zoo' });
    });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then((rows) => {
      res.json(rows);
    })
    .catch((err) => {
      res.status(500).json({ error: 'error' });
    });
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where('id', id)
    .then((rows) => {
      if (rows.length > 0) res.json(rows);
      else res.status(404).json({ error: 'The zoo with the specified ID does not exist' });
    })
    .catch((err) => {
      res.status(500).json({ err: 'Failed to find zoos' });
    });
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const zoo = req.body;

  db('zoos')
    .where('id', id)
    .update(zoo)
    .then((row) => {
      res.json(row);
    })
    .catch((err) => {
      res.status(500).json({ err: 'Failed to update zoo' });
    });
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where('id', id)
    .del()
    .then(row => res.status(201).json(row))
    .catch(err => res.status(500).json({ error: 'Failed to delete zoo' }));
});

server.listen(port, () => {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
