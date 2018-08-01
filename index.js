const express = require('express');
const db = require('./database/db');

const server = express();

server.use(express.json());

// endpoints here

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API up and running' });
});

server.post('/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into('zoos')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get('/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

server.get('/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      res.status(400).json(zoo);
    });
});

server.put('/zoos/:id', (req, res) => {
  const { id } = req.params;
  const zoo = req.body;
  db('zoos')
    .where({ id })
    .update(zoo)
    .then(count => {
      if (count)
        res
          .status(200)
          .json({ succes: 'You have successfully updated that zoo' });
      else res.status(404).json({ failure: 'Zoo not found for updating' });
    })
    .catch(err => res.status(500).json(err));
});

server.delete('/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(
      count =>
        count > 0
          ? res.status(200).json({ success: 'Record successfully deleted' })
          : res.status(404).json({ failure: 'Record not deleted' })
    )
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
