/// --- Node Dependencies ---
const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');

/// --- Instantiate Server ---
const server = express();
server.use(express.json());
server.use(helmet());

/// --- Instantiate Database ---
const db = knex(knexConfig.development);


///// --- CRUD Endpoints ---

/// --- Server Test READ Endpoint ---
server.get('/', (request, response) => {
  response.send('Working');
})

/// --- CREATE New Entry CRUD Endpoint ---
server.post('/api/:table', (request, response) => {

  // Extract URL Parameters
  const { table } = request.params;

  // Deconstruct Request Body
  const { name } = request.body;

  // Database Promise Functions
  db.insert({ name })
  .into(table)
  .then(ids => {
    response.status(201).send(ids);
  })
  .catch(error => {
    response.status(500).send(error);
  })
})

/// --- READ All Entries from Table CRUD Endpoint ---
server.get('/api/:table', (request, response) => {

  // Extract URL Parameters
  const { table } = request.params;

  // Database Promise Functions
  db(table)
  .then(data => {
    if (data.length < 1) {
      return response.status(404).send({errorMessage:`No ${ table } were found`})
    }
    response.status(200).send(data)
  })
  .catch(error => response.status(500).send(error))
})

/// --- READ Entry with Id CRUD Enpoint ---
server.get('/api/:table/:id', (request, response) => {

  // Extract URL Parameters
  const { id, table } = request.params;

  // Database Promise Functions
  db(table)
  .where({ id })
  .first()
  .then(data => {
    if(!data) {
    return response.status(404).send({errorMessage:`Unable to find a ${ table.slice(0, -1) } with the provided id.`})
    }
    response.status(200).send(data)
})
  .catch(error => response.status(500).send(error))
})

/// --- PUT Entry with Id CRUD Enpoint ---
server.put('/api/:table/:id', (request, response) => {

  // Extract URL Parameters
  const { id, table } = request.params;

  // Deconstruct Request Body
  const { name } = request.body;

  // Database Promise Functions
  db(table)
  .where({ id })
  .update({ name })
  .then(updated => {
    if(!updated || updated < 1) {
    return response.status(400).send({errorMessage:`Unable to update the ${ table.slice(0, -1) } with the provided id.`})
    }
    response.status(200).json(updated)
})
  .catch(error => response.status(500).send(error))
})

/// --- DELETE Entry with Id CRUD Enpoint ---
server.delete('/api/:table/:id', (request, response) => {

  // Extract URL Parameters
  const { id, table } = request.params;

  // Database Promise Functions
  db(table)
  .where({ id })
  .del()
  .then(deleted => {
    if(!deleted || deleted < 1) {
    return response.status(400).send({errorMessage:`Unable to delete the ${ table.slice(0, -1) } with the provided id.`})
    }
    response.status(200).json(deleted)
})
  .catch(error => response.status(500).send(error))
})


/// --- Server Port and Listen Function ---
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
