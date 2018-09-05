const express = require('express');
const helmet = require('helmet');
const dbConfig = require('./knexfile');
const knex = require('knex');
const bodyParser = require('body-parser');

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());
server.use(bodyParser.json());

// endpoints here
server.get('/zoos', (req, res) => {
  db('zoos')
    .then((zoos) => {
      res.status(200).json(zoos);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.get('/zoos/:id', (req, res) => {
  db('zoos').where({ id: req.params.id })
    .then((zoos) => {
      res.status(200).json(zoos);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.post('/zoos', (req, res) => {
  db.insert(req.body).into('zoos')
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Missing or incorrect input' });
    })
});

server.delete('/zoos/:id', (req, res) => {
  db('zoos').where({ id: req.params.id })
    .del()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
    })
});

server.put('/zoos/:id', (req, res) => {
  db('zoos').where({ id: req.params.id })
    .update(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
