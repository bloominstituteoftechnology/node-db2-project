const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// POST a new zoo
server.post('/api/zoos', (req, res) => {
  const name = req.body;
  db.insert(name)
    .into('zoos')
    .then(id => {
      res.status(201).json(id[0]);
    })
    .catch(err => {
      res.status(500).json({ message: 'Something went wrong.' });
    });
});

// GET Zoos
server.get('/api/zoos', (req, res) => {
  db.select('*')
    .from('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// GET ALL Zoos
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db.select('*')
    .from('zoos')
    .where({ id })
    .then(zoo => {
      res.status(200).json({ ...zoo[0] });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// UPDATE Zoo Name
server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// DELETE Zoo
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
