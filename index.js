const express = require('express');
//const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
//server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    .returning(id)
    .then(ids => {
      res.status(201).json(ids);  //ids? v id?
    })
    .catch(err => {
      res.status(500).json({ message: 'No such animal' });
    })
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .get()
    .then(zoos => {
      res.status(201).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ message: 'No such animal' });
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id: zooId })
    .get(id)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
      res.status(500).json({ message: 'No such animal' });
    })
})

server.delete('/api/zoos/:zooId', (req, res) => {
  const { zooId } = req.params;
  db('zoos')
    .where({ id: zooId })
    .delete(id)
    .then(count => {
      res.status(201).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: 'No such animal' });
    })
})

server.put('/api/zoos/:zooId', (req, res) => {
  const { zooId } = req.params;
  const changes = req.body;// {changes}?
  db('zoos')
    .where({ id: zooId })
    .update(changes)
    .then(count => {
      res.status(201).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: 'No such animal' });
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
