const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// API ENDPOINTS FOR ZOO'S
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

const port = 6000;

server.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
