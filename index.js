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
  const zoo = req.body;

  // insert into zoos
  if(!zoo.name) {
    res.status(400).json({ errorMsg: 'A name is required to post.' })
  }
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
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

// GET /api/zoos/:id
// When the client makes a GET request to /api/zoos/:id, find the zoo associated with the given id. 
// Remember to handle errors and send the correct status code.

server.get('/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
  .where('id', '=', id)
  .then(zoo => {
      res.status(200).json(zoo)
  })
  .catch(err => res.status(500).json({ errorMsg: 'Unable to retrieve the zoo.' }))
})

// DELETE /api/zoos/:id
// When the client makes a DELETE request to this endpoint, the zoo that has the provided id 
// should be removed from the database.

server.put('/zoos/:id', (req, res) => {
  const { id } = req.params;
  const zoo = req.body;

  db('zoos')
    .where('id', '=', id)
    .update(zoo)
    .then(count => {
      res.status(200).json(count)
    })
    .catch(err => res.status(500).json({ errorMsg: 'Unable to edit zoo with the provided id.' }))
})

// PUT /api/zoos/:id
// When the client makes a PUT request to this endpoint passing an object with the changes, the 
// zoo with the provided id should be updated with the new information.

server.delete('/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
  .where('id', '=', id)
  .del()
  .then(count => {
    res.status(200).json(count)
  })
  .catch(err => res.status(500).json({ errorMsg: 'Unable to delete zoo/zoos with that id.' }))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
