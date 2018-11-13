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
  if(!animal.name || animal.name.length === 0) {
    res.status(404).json({ message: 'please provide a name' })
  } else {
    db('zoos').insert(animal)
      .then(id => {
        res.status(201).json({ id: id, animal })
      })
      .catch(err => {
        res.status(500).json({ message: 'error adding to database' })
      })
    }
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(animals => {
      res.status(200).json(animals)
    })
    .catch(err => {
      res.status(500).json({ message: 'error loading your request' })
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const id  = req.params
      db('zoos')
        .where(id)
        .then(animal => {
          if(animal.length === 0) {
            res.status(404).json({ message: 'animal by id not found'})
          } else {
            res.status(200).json(animal)
          }
        })
        .catch(err => {
          res.status(500).json({ message: 'error loading your request' })
        })
})

server.delete('/api/zoos/:id', (req, res) => {
  const id = req.params

    db('zoos')
      .where(id)
      .del()
      .then(count => {
        if(count === 0) {
          res.status(404).json({ message: 'animal by id not found' })
        } else {
          res.status(200).json(count)
        }
      })
      .catch(err => {
        res.status(500).json({ message: 'error completing your request'})
      })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
