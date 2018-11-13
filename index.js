const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const knexConfig = require('./knexfile.js')

const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

//create a new zoo object
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    .then( ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({
      message: err
    }))
});

// get all zoos objects
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(animal => {
      res.status(200).json(animal)
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
});

// get zoo object by id
server.get('/api/zoos/:animalId', (req, res) => {
  const { animalId } = req.params;
  db('zoos')
    .where({id: animalId })
    .then(animal => {
      if (animal) {
        res.status(200).json(animal)
      } else {
        res.status(404).json({message: 'animal not found'})
      }
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
});

// update an existing zoo object
server.put('/api/zoos/:animalId', (req, res) => {
  const changes = req.body;
  const { animalId } = req.params;

  db('zoos')
    .where({id: animalId})
    .update(changes)
    .then(count => {
      if(count) {
        res.status(200).json({message: `${count} zoo object updated`})
      } else {
        res.status(404).json({message: 'animal id does not exist'})
      }
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
});

// delete a zoo object
server.delete('/api/zoos/:animalId', (req, res) => {
  const { animalId } = req.params;

  db('zoos')
    .where({id: animalId})
    .del()
    .then(count => {
      if(count) {
        res.status(200).json({message: `${count} zoo object deleted`})
      } else {
        res.status(404).json({message: `${count} zoo object delete`})
      }
    })
    .catch(err => {
      res.staus(500).json(err);
    })
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
