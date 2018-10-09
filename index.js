const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send("Yup... it works.");
});

server.post('/api/zoos', (req, res) => {
  const name = req.body;

  db.insert(name)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids[0])
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const zoo = await db('zoos')
    .where({ id })
    .first();

    if (zoo) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: 'Zoo not found' })
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
  .where({ id })
  .del()
  .then(count => {
    if (!count || count < 1) {
      res.status(404).json({ message: 'No records found to delete' });
    } else {
      res.status(200).json(count);
    }
  })
  .catch(err => res.status(500).json(err));
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
