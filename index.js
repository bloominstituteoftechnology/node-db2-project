const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js')

const server = express();
const db = knex(dbConfig.development);
const PORT = 3300;

server.use(express.json());
server.use(helmet());

// endpoints here

// POST /api/zoos
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {

    })
})
// ### `POST /api/zoos`

// When the client makes a `POST` request to 
// this endpoint, a new _zoo_ should be created 
// in the _zoos_ table.

// Ensure the client passes a `name` property in 
// the request body. If there's an error, respond 
// with an appropriate status code, and send a JSON 
// response of the form `{ error: "Some useful error message" }`.

// Return the `id` of the inserted zoo and a 201 status code.


// ### `GET /api/zoos`

// When the client makes a `GET` request to this endpoint, 
// return a list of all the _zoos_ in the database. Remember 
// to handle any errors and return the correct status code.


// ### `GET /api/zoos/:id`

// When the client makes a `GET` request to `/api/zoos/:id`, 
// find the _zoo_ associated with the given `id`. Remember 
// to handle errors and send the correct status code.


// ### DELETE /api/zoos/:id

// When the client makes a `DELETE` request to this endpoint, 
// the _zoo_ that has the provided `id` should be removed from the database.


// ### PUT /api/zoos/:id

// When the client makes a `PUT` request to this endpoint 
// passing an object with the changes, the _zoo_ with 
// the provided `id` should be updated with the new information.


server.listen(PORT, function() {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});
