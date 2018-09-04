const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('API running...')
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err))
})

server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id})
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err))
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => res.status(500).json(err))
});

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
  .where({ id: req.params.id })
  .del()
  .then(() => {
    res.status(204).end()
  })
});

server.put('/api/zoos/:id', (req, res) => {
  const zoo = req.body;
  console.log(zoo)
  db('zoos')
  .where({ id: req.params.id})
  .update(zoo)
  .then(() => {
    res.status(200).json({ message: 'Update Completed'})
  })
  .catch(err => {
    res.status(500).json({ message: 'Update Failed!'})
  })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
