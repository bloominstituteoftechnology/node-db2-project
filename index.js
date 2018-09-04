const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
// const db = require('./data/db');

const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// zoos endpoints here
server.post('/api/zoos', (req, res) => {
  const { name } = req.body;
  console.log(name);
  db.insert({name}).into('zoos')
  .then(ids => {
    res.status(201).json(ids)
  })
  .catch(err => res.status(500).json(err))
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err));
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where({id})
  .then(zoo => {
    res.status(200).json(zoo);
  })
  .catch(err => res.status(500).json(err));
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where({id})
  .del()
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db('zoos')
  .where({id})
  .update({name})
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

// bears endpoints here
server.post('/api/bears', (req, res) => {
  const { name } = req.body;
  console.log(name);
  db.insert({name}).into('bears')
  .then(ids => {
    res.status(201).json(ids)
  })
  .catch(err => res.status(500).json(err))
})

server.get('/api/bears', (req, res) => {
  db('bears')
  .then(bears => {
    res.status(200).json(bears);
  })
  .catch(err => res.status(500).json(err));
})

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
  .where({id})
  .then(bear => {
    res.status(200).json(bear);
  })
  .catch(err => res.status(500).json(err));
})

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
  .where({id})
  .del()
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

server.put('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db('bears')
  .where({id})
  .update({name})
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
