const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile')

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;

server.post('./data/lambda.sqlite3', (req, res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: 'Failed to insert new zoo' })
    })
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res
        .json(zoos);
    })
    .catch(err => {
      res
        .status(404)
        .json({ err: 'Failed to get zoos' });
    })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where('id', id)
    .then(zoo => {
      res.json(zoo);
    })
    .catch(err => {
      res
        .status(404)
        .json({ err: "Something went wrong" })
    })
})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const zoo = req.body;
  db('zoos')
    .where('id', id)
    .update(zoo)
    .then(rowCount => {
      res
        .json(rowCount);
    })
    .catch(err => {
      res
        .status(400)
        .json({ err: 'Failed to update zoo' })
    })
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where('id', id)
    .del()
    .then(count => {
      res.json(count)
    })
    .catch(err => {
      res
        .json({ err: 'Failed to delete zoo' })
    })
})


server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});