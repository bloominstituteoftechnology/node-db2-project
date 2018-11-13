const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
//====POST====
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db('zoos')
    .insert(zoo)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "Cannot post zoo" });
    });
});

//====GET ALL ZOOS====
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

//====GET ZOO BY ID====
server.get('/api/zoos/:id', (req, res) => {
  let { id } = req.params;
  // id = id - 1;
  db('zoos').where({id}).then(zoo => {
    if (zoo.id !== 0) {
      res.status(200).json(zoo)
    } else {
      res.status(404).json({ message: "The zoo with the specified id does not exist." });
    }
  }).catch(error => {
    res.status(500).json({ error: "Cant get zoo data." });
  });
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
