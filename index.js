const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const knex = require('knex');
const knexDB = require('./knexfile');
const DB = knex(knexDB.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger('tiny'));

// endpoints here

server.get('/api/zoos', (req, res) => {
  DB('zoos')
  .then(zoos => {
    res.json(zoos)
  })
  .catch(() => {
    res.status(500).json({ error: 'Unable to retrieve list of zoos from the DB.' })
  })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  DB('zoos')
  .where('id', id)
  .then(rows => {
    res.json(rows)
  })
  .catch(() => {
    res.status(500).json({ error: 'Failed to find a zoo with this ID in the DB.' })
  })
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body
  if (zoo.name) {
    DB('zoos')
      .insert(zoo)
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: 'Failed to insert the zoo into the database.' })
      })
  } else {
    res.status(400).json({ error: 'Name required to insert zoo into the DB.' })
  }
})

server.put('/api/zoos/:id', (req, res) => {

  const { id } = req.params;
  const zoo = req.body;

  if (zoo.name) {
      DB('zoos').where('id', id).update(zoo)
          .then(zooCount => {
              res.status(200).json('zoo has been updated')
          })
          .catch(err => {
              res.status(500).json({ message: 'Could not update zoo' })
          })
  } else {
      res.status(400).json({ message: 'Missing name' })
  }
})
    

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
