const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//GET all zoos
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json(err));
});

//GET zoo by id
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .then(zoo => zoo.length ?
              res.status(200).json(zoo[0]) :
              res.status(404).json({ message: "No zoo with that id" })
          )
    .catch(err => res.status(500).json(err));
});

//POST a new zoo
server.post('/api/zoos', (req, res) => {
  const { name } = req.body;

  db
    .insert({ name })
    .into('zoos')
    .then(zoos => res.status(201).json(zoos))
    .catch(err => res.status(500).json(errr));

});

//DELETE zoo by id
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(delZoo => res.status(200).json(delZoo))
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
