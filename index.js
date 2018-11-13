const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile.js');
const knex = require('knex');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.post('/api/zoos', (req,res) => {
  const zoo = req.body;
  db('zoos')
  .insert(zoo)
  .then(id => {
    res.status(201).json(id)
  })
  .catch(error => {
    res.status(500).json(error)
  })

})

server.get('/api/zoos', (req,res) => {
  db('zoos')
  .then(zoos =>  res.status(200).json(zoos))
  .catch(err => res.status(500).json(err))
})

server.get('/api/zoos/:zooID', (req,res) => {
  const {zooID} = req.params;
  db('zoos')
  .where({id: zooID})
  .then(zoo => {
    res.status(200).json(zoo)
  })
  .catch(error => {
    res.status(404).json(error)
  })
})

server.delete('/api/zoos/:zooID', (req, res) => {
  const {zooID} = req.params;
  db('zoos')
  .where({id: zooID})
  .del()
  .then(count => {
    res.status(200).json(count)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})

server.put('/api/zoos/:zooID', (req,res) => {
  const {zooID} = req.params;
  const updates = req.body;
  db('zoos')
  .where({id: zooID})
  .update(updates)
  .then(count => {
    res.status(200).json(count)
  })
  .catch(error => {
    res.status(500).json(error)
  })
})
