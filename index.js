const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.get('/', (req, res) => {
  res.json('We got it active');
})

server.get('/api/zoos/', (req, res) => {
  db('zoos')
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(e => {
      res.status(500).json(e)
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id
  db('zoos')
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(e => {
      res.status(500).json(e)
    })

})

server.post('/api/zoos/', (req, res) => {
  const newZoo = req.body
  db('zoos')
    .insert(newZoo)
    .into('zoos')
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(e => {
      res.status(500).json(e)
    })
})

server.put('/api/zoos/:id', (req, res) => {
  const editZoo = req.body
  const id = req.params.id
  db('zoos')
    .where({ id })
    .update(editZoo)
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(e => {
      res.status(500).json(e)
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  const id = req.params.id
  db('zoos')
    .where({ id })
    .del()
    .then(zoo => {
      res.status(200).json(`${zoo} has been deleted!`)
    })
    .catch(e => {
      res.status(500).json(e)
    })
})
