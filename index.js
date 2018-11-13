const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const id = req.params.id
  const animal = req.body;
  db('zoos')
    .insert(animal)
    // .returning('id')
    .then(ids =>{res.status(200).json(ids)})
    .catch((err)=>
 res.status(500).json({ message: 'could not add zoo', error }))
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos =>{res.status(200).json(zoos)})
    .catch((err)=>
 res.status(500).json({ message: 'could not get zoo', error }))
});

server.put('/api/zoos/:id', (req, res) => {
  const zooId = req.params.id;
  const body = req.body;
 
  db('zoos')
  .where({ id : zooId})
  .update(body)
    .then(count =>{res.status(200).json(count)})
    .catch((err)=>
 res.status(500).json({ message: 'could not update', error }))
});

server.delete('/api/zoos/:id', (req, res) => {
  const zooId = req.params.id;

  db('zoos')
  .where({ id : zooId})
  .delete()
    .then(count =>{res.status(200).json(count)  })
    .catch((err)=>
 res.status(500).json({ message: 'could not delete', error }))
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
