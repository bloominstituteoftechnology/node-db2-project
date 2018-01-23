const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js'); // new

const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/', function(req, res) {
  res.status(200).json({ success: true });
});

server.get('/api/zoos', function(req, res) {
  knex('zoos')
    .then(function(zoos) {
      res.status(200).json(zoos);
    })
    .catch(function() {
      res.status(500).json({ errorMessage: 'Could not get the Zoos' });
    });
});

server.get('/api/zoos/:id', function(req, res) {
  const { id } = req.params;

  knex('zoos')
    .where('id', id)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function() {
      res.status(500).json({ errorMessage: 'Could not get the Zoo' });
    });
});

server.post('/api/zoos', function(req, res) {
  // new route handler
  const zoo = req.body;

  knex
    .insert(zoo)
    .into('zoos')
    .then(function(ids) {
      res.status(201).json({ ids });
    })
    .catch(function() {
      res.status(500).json({ errorMessage: 'Could not insert the Zoo' });
    });
});

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});

// raw connector || query builder || ORM: Object Relational Mapper
// SQL Injection
