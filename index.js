const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(helmet());
const knex = require('knex');
const dbConfig = (require('./knexfile'));
const db = knex(dbConfig.development);


// endpoints here

server.post('/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
    .then(ids => {
      res.status(201).json(ids)
    })
    .catch(err => {
      res.status(500).json({ err: 'failed to retrieve zoos' })
    });
});

server.get('/zoos:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where('id', id)
    .then(rows => {
      res.json(rows)
    })
    .catch(err => {
      res.status(500).json({ err: 'cannot find the zoo with that ID' })
    });
});

server.get('/zoos', (req, res) => {
  db('zoos')
    .then(rows => {
      res.json(rows)
    })
    .catch(err => res.status(500).json({ err: "failed to get zoos" }))
});



const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
