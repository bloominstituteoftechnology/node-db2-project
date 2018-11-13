const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexconfig = require('./knexfile.js');

const db = knex(knexconfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    res.status(500).json({ error: 'Please provide a name field.' });
  } else {
    db('zoos')
    .insert(zoo)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error adding zoo.', err });
    })
  }
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching zoos.', err });
    });
});

server.get('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params;

  db('zoos')
    .where({ id: zooid })
    .then(zoo => {
      if (!zoo) {
        res.status(404).json({ error: 'No zoo with that ID found.' });
      } else {
        res.status(200).json(zoo);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching zoo.', err });
    });
});

server.delete('/api/zoos/:zooid', (req, res) => {
  const { zooid } = req.params;

  db('zoos')
    .where({ id: zooid })
    .del()
    .then(count => {
      if (count === 0) {
        res.status(404).json({ error: 'Zoo with that ID not found.' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error deleting the zoo.', err });
    })
});

server.put('/api/zoos/:zooid', (req, res) => {
  const changes = req.body;
  const { zooid } = req.params;

  db('zoos')
    .where({ id: zooid })
    .update(changes)
    .then(count => {
      if (count === 0) {
        res.status(404).json({ error: 'Zoo with that ID not found.' });
      } else {
        res.status(200).json(count)
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'There was an error updating the zoo.', err });
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
