const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
const db = knex(knexConfig.development)

server.get("/", (req, res) => {
  res.send('api working');
});


server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});


server.get('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'zoo not found' });
      }
    });
});


server.post('/api/zoos', (req, res) => {
  // db.insert(req.body).into('zoos').then().catch()
  db('zoos')
    .insert(req.body)
    .then(ids => {
      db('zoos')
        .where({ id: ids[0] })
        .then(zoo => {
          res.status(201).json(zoo);
        });
    })
    .catch(err => res.status(500).json(err));
});


server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;

  db('zoos')
    .where({ id: req.params.id })
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: 'zoo not found' });
      }
    })
    .catch(err => res.status(500).json(err));
});


server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where('id', '=', id) // or .where({ id: id })
    .update(changes)
    .then(count => {
      // count === number of records updated
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
