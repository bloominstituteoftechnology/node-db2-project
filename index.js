const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {

  const animal = req.body;

  if (animal.name) {
    db('zoos').insert(animal)
      .then(animalId => {
        res.status(200).json(animalId)
      })
      .catch(err => {
        res.status(500).json({ message: 'Could not insert animal' })
      })
  } else {
    res.status(400).json({ messagae: 'Missing name' })
  }
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(animals => {
      res.status(200).json(animals)
    })
    .catch(err => {
      res.status(500).json({ message: 'Could not get animals' })
    })
})

server.get('/api/zoos/:id', (req, res) => {

  const { id } = req.params;

  db('zoos').where('id', id)
    .then(animal => {
      res.status(200).json(animal)
    })
    .catch(err => {
      res.status(500).json({ message: 'Cout not get animal' })
    })
})

server.put('/api/zoos/:id', (req, res) => {

  const { id } = req.params;
  const animal = req.body;

  if (animal.name) {
    db('zoos').where('id', id).update(animal)
      .then(animalCount => {
        console.log(animalCount)
        res.status(200).json('Animal has been updated')
      })
      .catch(err => {
        res.status(500).json({ message: 'Could not update animal' })
      })
  } else {
    res.status(400).json({ message: 'Missing name' })
  }
})

server.delete('/api/zoos/:id', (req, res) => {

  const { id } = req.params;

  db('zoos').where('id', id).del()
    .then(animalCount => {
      res.status(201).json('Animal has been deleted')
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete animal' })
    })
})

const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
