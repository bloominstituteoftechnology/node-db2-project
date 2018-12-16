const express = require('express');
const knex = require('knex')
const helmet = require('helmet');
const dbConfig = require('./knexfile')

const server = express();
const db = knex(dbConfig.development)

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then( zoos => {
      res.json(zoos)
    })
    .catch( err => {
      res.status(500).json({error: 'unable to get the zoos'})
    })
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos').where('id', id)
    .then( zoo => {
      res.json(zoo)
    })
    .catch( err => {
      res.status(500).json({error: 'unable to get the zoo'})
    })
});

server.post('/api/zoos', (req, res) => {
  const newZoo = req.body;

  db('zoos').insert(newZoo)
    .then( row => {
      res.status(201).json({message: `successfully created ${row} row(s)`})
    })
    .catch( err => {
      res.status(500).json({error: 'unable to create a new zoo'})
    })
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('zoos').where('id', id).update(changes)
    .then( rows => {
      res.status(201).json({message: `updated ${rows} row(s)`})
    })
    .catch( err => {
      res.status(500).json({error: 'unable to update rows'})
    })
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos').where('id', id).del()
    .then( rows => {
      res.json({message: `successfully deleted ${rows} row(s)`})
    })
    .catch( err => {
      res.status(500).json({error: 'unable to delete row(s)'})
    })
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
