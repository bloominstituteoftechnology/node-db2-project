const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const knexConfig = require('./knexfile.js');
// telling it to configure an object, which is our database
const db = knex(knexConfig.development)


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// testing server
server.get('/', (req, res) => {
  res.json("Yahoo was good for Japanese Market place")
})
// get
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    })
})
// create 
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo).into('zoos')
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json(err);
    })
})
// update

// delete

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on PORT ${port} ===\n`);
});
