const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const animal = req.body;

  if (!animal.name){
    res.status(401).json({message: "name is required"});
    return;
  }

  db('zoos')
    .insert(animal)
    .returning('id')
    .then(ids => res.status(201).json(ids))
    .catch(error => res.status(500).json({message:'error posting animal', error}));

})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoo => res.status(200).json(zoo))
    .catch(error => res.status(500).json(error));
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({id})
    .then(animal => {
      if (!animal.length) {
        res.status(404).json({message: 'animal by id not found'})
        return
      }
      res.status(200).json({animal})
    })
    .catch(error => res.status(500).json({message: 'error getting animal by id', error}))

})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({id})
    .del()
    .then(count => {
      res.status(200).json({message: `${count} animals deleted`})
    })
    .catch(error => res.status(500).json({message: 'error deleting animal by id', error}))

})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  const animal = req.body;

  if (!animal.name){
    res.status(401).json({message: "name is required"});
    return;
  }

  db('zoos')
    .where({id})
    .update({name: animal.name})
    .then(count => res.status(200).json({message: `${count} animals updated`}))
    .catch(error => res.status(500).json({message: 'error updating animal by id', error}))

})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
