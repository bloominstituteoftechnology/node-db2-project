const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const knexConfig = require('./knexfile.js')
const server = express();
const db = knex(knexConfig.development)
server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  animal = req.body
    db('zoos').insert(animal)
      .then(id => {
        res.status(201).json({ id: id, animal })
      })
      .catch(err => {
        res.status(500).json({ message: 'error adding to database' })
      })
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(animals => {
      res.status(200).json(animals)
    })
    .catch(err => {
      res.status(500).json({ message: 'error adding to database' })
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
