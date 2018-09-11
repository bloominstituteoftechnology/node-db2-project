const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.send('Your API is running.')
})

// POST /api/zoos
// When the client makes a POST request to this endpoint, a new zoo should be created in the zoos 
// table.

// Ensure the client passes a name property in the request body. If there's an error, respond with 
// an appropriate status code, and send a JSON response of the form 
// { error: "Some useful error message" }.

// Return the id of the inserted zoo and a 201 status code.

server.post('/zoos', (req, res) => {
  const name = req.body;

  // insert into zoos
  db.insert(name)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => res.status(500).json({ errorMsg: 'Could not add zoo to database.' }))
})

// GET /api/zoos
// When the client makes a GET request to this endpoint, return a list of all the zoos in the 
// database. Remember to handle any errors and return the correct status code.

server.get('/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ errorMsg: 'Could not retrieve zoos.' }))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
