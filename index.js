const express = require('express');
const helmet = require('helmet');

const knex = require('knex')
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res) => {
  const { name } = req.body
  if (!name) {
    req.statusCode(400).json({ message: "Provide name"})
  } else {
    db('zoos')
      .insert(req.body)
      .returning('id')
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(error => {
        res.status(500).json({ message: "There was an error while saving" })
      })
  }
})

server.get('/', (req, res) => {
  res.send({ message: "API is running :D" })
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(error => {
      res.status(500).json({ message: "Information could not be retrieved" })
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
    .where({ id: id })
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(error => {
      res.status(500).json({ message: "Information could not be retrieved", error: error})
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  db('zoos')
    .where({ id: id })
    .del()
    .then (zoo => {
      if (zoo) {
        res.status(200).json(zoo)
      } else {
        res.status(404).json({ message: "Specified ID does not exist" })
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not remove", error: error })
    })
})

server.put('/api/zoos/:id', (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400).json({ message: "Provide name" })
  } else {
    db('zoos')
      .where({ id: req.params.id })
      .update(req.body)
      .then(zoo => {
        if (zoo) {
          res.status(200).json(zoo)
        } else {
          res.status(404).json({ message: "Specified ID does not exist" })
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Could not update", error: error })
      })
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
})
