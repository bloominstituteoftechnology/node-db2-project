const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// ROUTES

// Add home route
server.get('/', (req, res) => {
  res.send("You are home");
});

// ==============================ZOOS ENDPOINTS=====================================

// Add GET ROUTE HANDLER to get the list of zoos
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// Add POST ROUTE HANDLER to create a zoo
server.post('/api/zoos', (req, res) => {
  if (!req.body.name){
    return res.status(400).send({ error: "Please provide a name for this zoo." });
  }
  const zoo = req.body;

  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

