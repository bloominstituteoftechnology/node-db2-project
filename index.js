const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// GET "homepage" returns api running
server.get('/', (req, res) => {
  res.json({ api: 'running!' });
});

// GET zoos
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Error retrieving zoos', error: err });
    })
});

// GET zoo by zoo id
server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .then(zoo => {
      if (zoo.length) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ errorMessage: 'Zoo at specified index does not exist' })
      }
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Error retrieving zoo', error: err });
    })
})

// POST new zoo to api
server.post('/api/zoos', (req, res) => {
  db('zoos')
    .insert(req.body)
    .then(id => {
      return db('zoos').where({ id: id[0] });
    })
    .then(zoo => {
      res.status(201).json(zoo);
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Error creating zoo', error: err });
    });
});

const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
