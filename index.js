const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('API is running...')
});

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    res.status(400).json({ error: "Please provide a name for the zoo." })
  } else
    db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json({ error: "There was an error saving the zoo." }))
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err));
})

server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  db('zoos').where({ id: id })
  .then(zoo => {
    if (zoo.length === 0) {
      res.status(404).json({ message: "The zoo with the specified ID does not exist." });
    } else 
      res.status(200).json(zoo);
  })
  .catch(err => res.status(500).json(err));
})

server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  db('zoos').where({ id: id }).del()
  .then(count => {
    if (count) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "The zoo with the specified ID does not exist." });
    }
  })
  .catch(err => res.status(500).json(err));
})

server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;
  if (!zoo.name) {
    res.status(400).json({ error: "Please provide a name for the zoo." })
  } else
    db('zoos').where({ id: id }).update(zoo)
    .then(count => {
      if (count) {
        res.status(200).json({ message: "The zoo was successfully updated." });
      } else {
        res.status(404).json({ message: "The zoo with the specified ID does not exist." });
      }
    })
    .catch(err => res.status(500).json(err));
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
