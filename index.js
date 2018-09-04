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
  res.send('It works mon');
});

server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos);
  });
});

server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .then(row => {
      if (row.length < 1) {
        return res.status(404).json({ message: 'This zoo doesnt exist' });
      }
      res.status(200).json(row);
    });
});

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    return res
      .status(400)
      .json({ message: 'Please provide a name for the zoo.' });
  }
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/zoos/:id', (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    return res
      .status(400)
      .json({ message: 'Please provide a name for the zoo.' });
  }
  db('zoos')
    .where({ id: req.params.id })
    .update(zoo)
    .then(response => {
      if (!response) {
        return res.status(404).json({ message: 'The zoo does not exist.' });
      }
      res.status(200).json({ id: req.params.id, name: zoo.name });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(data => {
      if (!data) {
        return res
          .status(404)
          .json({ message: 'The zoo with that id does not exist' });
      }
      res.status(200).json({ id: req.params.id });
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
