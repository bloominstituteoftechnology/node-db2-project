const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

// endpoints here
server.get('/', (req, res) => {
  res.send('up and running...');
});

server.get('/zoos', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos);

  }) .catch(err => res.status(500).json(err));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


//PR