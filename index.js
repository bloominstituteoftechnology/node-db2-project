const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// GET test
  server.get('/', (req, res) => {
    res.send('api is running');
  })

// GET /api/zoos
  server.get('/api/zoos', (req, res) => {
    db('zoos')
      .then(zoos => {
        res.status(200).json(zoos)
      })
      .catch(err => res.status(500).json(err))
  })
//GET /api/zoos/:id
  server.get('/api/zoos/:id', (req, res) => {
    db('zoos')
      .where({ id: req.params.id })
      .then(ids => {
        res.status(200).json(ids)
      })
      .catch(err => res.status(500).json(err))
  })

//POST /api/zoos
  server.post('/api/zoos', (req, res) => {

    db('zoos')
      .insert(req.body)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => res.status(500).json('Unable to add the user'));
  });

//DELETE /api/zoos/:id
  server.delete('/api/zoos/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err))
  })
    

//PUT /api/zoos/:id
server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;

  db('zoos')
  .where({ id: req.params.id })
  .update(changes)
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => res.status(500).json(err))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
