const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// GET ENDPOINTS FOR ZOO'S

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// POST ENDPOINT FOR ZOO'S

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (!zoo) {
    res.status(500).json({ error: 'Please include a body.' });
  } else {
    db.insert(zoo)
      .into('zoos')
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => res.status(500).json(err));
  }
});

// PUT ENDPOINT FOR ZOO'S

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db('zoos')
    .where({ id })
    .update(changes)
    .then(count => {
      if (!count || count < 1) {
        res.status(401).json({ message: 'No zoo records found to update.' });
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => res.status(500).json(err));
});

// DELETE ENDPOINT FOR ZOO'S

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(() =>
      res.status(500).json({ error: 'There are no records to delete.' })
    );
});

// GET ENDPOINTS FOR BEAR'S

server.get('/api/bears', (req, res) => {
  db('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/bears/:id', (req, res) => {
  const { id } = req.params;
  db('bears')
    .where({ id })
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});

// POST ENDPOINT FOR BEAR'S

server.post('/api/bears', (req, res) => {
  const bears = req.body;
  if (!bears) {
    res.status(500).json({ error: 'Please include a body.' });
  } else {
    db.insert(bears)
      .into('bears')
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => res.status(500).json(err));
  }
});

const port = 6000;

server.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
