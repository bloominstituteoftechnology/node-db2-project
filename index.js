const express = require('express');
const db = require('./data/db');
const server = express();

server.use(express.json());

// endpoints here
server.get('/', (req, res) => {
  res.send('Working');
})

server.get('/Zoos', (req, res) => {
  db('Zoos')
  .then(Zoos => {
    res.status(200).json(Zoos);
  })
  .catch(err => res.status(500).json(err));
})

server.get('/Zoos/:id', (req, res) => {
  const { id } = req.params;
  db('Zoos')
  .where({ id })
  .then(zoo => {
    res.status(200).json(zoo);
  })
  .catch(err => res.status(500).json({ err: "Can't get Zoo by ID"}));
})

server.post('/Zoos', (req, res) => {
  const Zoo = req.body;

  db.insert(Zoo).into('Zoos')
  .then(id => {
    res.status(201).json({ id, ...Zoo });
  })
  .catch(err => res.status(500).json({ err: "Not posting Zoo"}));
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
