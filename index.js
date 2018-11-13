const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  db('zoos').then(zoos => res.status(200).json(zoos))
    .catch(err  => res.status(500).json(err))
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
    if(zoo || zoo.length) {
    db('zoos')
      .insert(zoo)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json({message: "there was a problem creating the zoo"}))
    } else {
      res.status(500).json({message: 'The data was invalid'})
    }
})

server.delete('/api/zoos/:id', (req, res) => {
  console.log(req.params)
  const {zooId} = req.params;
  db('zoos')
    .where({id: zooId})
    .del()
    .then(count => {
      res.status(200).json({count})
     
    })
    .catch(err => res.status(500).json(err))
})

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
