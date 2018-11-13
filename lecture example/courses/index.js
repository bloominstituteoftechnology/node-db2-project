const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.post('/api/students', (req, res) => {
  const student = req.body;

  db('students')
    .insert(student)
    .returning('id')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err });
    });
});

server.get('/api/students', (req, res) => {
  db('students')
    .then(students => res.status(200).json(students))
    .catch(err => res.status(500).json(err));
});

server.put('/api/students/:studentid', (req, res) => {
  const changes = req.body;
  const { studentid } = req.params;

  db('students')
    .where({ id: studentid })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/students/:studentid', (req, res) => {
  const { studentid } = req.params;

  db('students')
    .where({ id: studentid })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

server.listen(9000, () => console.log('\n== Port 9k ==\n'));
