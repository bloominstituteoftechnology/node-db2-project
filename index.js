const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

// ___________ GET _______________

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

/*
// ___________ POST _______________
server.post('/api/zoos', (req, res) => {
  const student = req.body;

  db('zoos')
    .insert(student)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

// ___________ PUT ______________

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { studentid } = req.params;

  db('zoos')
    .where({ id: studentid })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// ___________ DELETE _______________

server.delete('/api/zoos/:id', (req, res) => {
  const { studentid } = req.params;

  db('zoos')
    .where({ id: studentid })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

*/

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
