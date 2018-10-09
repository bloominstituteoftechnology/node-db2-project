const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);

///// --- endpoints here ---

/// --- Server Test READ Endpoint ---
server.get('/', (request, response) => {
  response.send('Working');
})

/// --- CREATE New Zoo CRUD Endpoint ---

server.post('/api/zoos', (request, response) => {
  const { name } = request.body;
  db.insert({ name })
  .into('zoos')
  .then(ids => {
    response.status(201).send(ids);
  })
  .catch(error => {
    response.status(500).send(error);
  })
})

/// --- READ All Zoos CRUD Endpoint ---

server.get('/api/zoos', (request, response) => {
  db('zoos')
  .then(zoos => {
    if (zoos.length < 1) {
      return response.status(404).send({errorMessage:"No Zoos were Found"})
    }
    response.status(200).send(zoos)
  })
  .catch(error => response.status(500).send(error))
})


/// --- READ Zoo By Id CRUD Enpoint ---

server.get('/api/zoos/:id', (request, response) => {
  const { id } = request.params;
  db('zoos')
  .where({ id })
  .first()
  .then(zoo => {
    if(!zoo) {
    return response.status(404).send({errorMessage:"Unable to find a Zoo with the provided id."})
    }
    response.status(200).send(zoo)
})
  .catch(error => response.status(500).send(error))
})




const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
