const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');


const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;

server.get('/', (req, res) => {
  res.json({message: "Server up and running!!"})
});

server.get('/zoos', (req, res) => {
  db('zoos')
  .then(rows => {
    res.json(rows);
  })
  .catch(err => {
    res.status(500).json({ err: "Failed to find zoos" });
  })
})


server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
