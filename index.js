const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {

  const name = req.body;

  db('zoos')
    .insert(name)
    .then(ids => {
      db('zoos')
        .where({ id: ids[0] })
        .then(zoo => {
          res.status(201).json(zoo);
        });
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos', (req, res) => {

  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;

  db('zoos').where({id}).first().then( stuff => {
    if (bear) {
      res.status(200).json(zoo);
    } else {
      res.status(404).json({ message: 'zoo not found' });
    }
  })
  .catch(err => res(500).json({error: err}));
})

server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  db('zoos')
    .where({id})
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const {name} = req.body;

  db('zoos')
    .where({id})
    .update({name})
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'zoos not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
