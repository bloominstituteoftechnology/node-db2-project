const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();
const dBConfig = require('./knexfile');
server.use(express.json());
server.use(helmet());
const db = knex(dBConfig.development);
// endpoints here
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo).into('zoos').then(zoos => {
    res.status(201).json(zoos);
  })
  .catch(err => 
    res.status(500).json(err));
});

server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err));
});
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
