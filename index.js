// https://github.com/LambdaSchool/db-zoos/pull/184

const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development)
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(err => console.log(err))
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    .then(id => {
      res.status(201).json({ message: `${id} has been added to the table.`})
    })
    .catch(err => console.log(err))
})

server.get('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params
  db('zoos')
    .where({ id: zooid })
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(err => console.log(err))
})

server.delete('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params
  db('zoos')
    .where({ id: zooid })
    .del()
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(err => console.log(err))
})

server.put('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params
  const changes = req.body;

  db('zoos')
    .where({ id: zooid })
    .update(changes)
    .then(count => {
      res.status(200).json({ count })
    })
    .catch(err => console.log(err))
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
