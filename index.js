const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

server.use(express.json());
server.use(helmet());

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
  .where({id})
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.post('/api/zoos', (req, res) => {
  const animal = req.body;
  
  db('zoos').insert(animal).then(ids => {
      res.status(201).json(ids)
  }).catch(err => res.status(500).json({message: err}))
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
  .where({id})
  .del()
  .then(count => {
    res.status(200).json({count})
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('zoos')
  .where({id})
  .update(changes)
  .then(count => {
    res.status(200).json({count})
}).catch(err => {
    res.status(500).json(err)
})
})
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
