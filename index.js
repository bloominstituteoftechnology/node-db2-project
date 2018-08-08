const express = require('express');

const db = require('./data/db');


const server = express();

server.use(express.json());

// endpoints here
server.get('/', (req, res) => {
  res.send('up and running...');
});

server.get('/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err));
});

server.post('/zoos', (req, res) => {
  const zoo = req.body;

  db
  .insert(zoo)
  .into('zoos')
  .then(ids => {
    const id = ids[0];
     res.status(201).json({ id, ...zoo });
  })
  .catch(err => res.status(500).json(err));
});

server.put('/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
  .where({ id })
  .update(changes)
  .then(count => {
    if (count) {

      db('zoos')
      .select('name')
      .where({ id })
      .then(zoo => {
        res.status(200).json(zoo);
      })
      .catch(err => {
        res.status(500).json(err);
      })
    } else {
      res.status(404).json({ message: 'The zoo was not found'});
    }
 })
  .catch(err => res.status(500).json(err))
});

server.delete('/zoos/:id', (req,res) => {
  const { id } = req.params;

  db('zoos')
  .where({ id })
  .del()
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => res.status(500).json(err))
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
