const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//sanity check
server.get('/', (req, res) => {
  res.json({ api: "let's goooooo" });
});

//GET zoos
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err =>
      res.status(500).json({
        message: 'The requested zoo could not be retrieved',
        error: err
      })
    );
});

//GET zoos by id
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res
          .status(404)
          .json({ message: 'The zoo with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: 'The zoo information could not be retrieved.',
        error: err
      });
    });
});

//POST zoo
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
    .insert(zoo)
    .returning('id')
    .then(id => res.status(201).json(id))
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Your zoo could not be added.', error: err })
    );
});

//PUT zoo
server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Your zoo could not be udpated.', error: err })
    );
});

//DELETE zoo
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'Your zoo could not be deleted.', error: err })
    );
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
