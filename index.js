const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
//GET..
server.get('/', (request, response) => {
    response.send('ACTIVE...');
    //response.json('ACTIVE...');
})

//GET../api/zoos
server.get('/api/zoos', (request, response) => {
    db('zoos')
            .then(zoos => response.status(200).json(zoos))
            .catch(error => response.status(500).json(error));
})

//GET../api/zoos:id
server.get('/api/zoos/:id', (request, response) => {
    db('zoos')
            .where({ id : request.params.id })
            .then(zoo => response.status(200).json(zoo))
            .catch(error => response.status(500).json(error));
})

//POST ../api/zoos
server.post('/api/zoos', (request, response) => {
          db.insert(request.body)
            .into('zoos')
            .then(zoos => response.status(200).json(zoos))
            .catch(error => response.status(500).json(error));
})

//PUT 
server.put('/api/zoos/:id', (request, response) => {
  db('zoos')
        .where({ id : request.params.id })
        .update(request.body)
        .then(zoo => response.status(200).json(zoo))
        .catch(error => response.status(500).json(error));
})

//DELETE 
server.delete('/api/zoos/:id', (request, response) => {
  db('zoos')
        .where({ id : request.params.id })
        .del()
        .then(zoo => response.status(200).json(zoo))
        .catch(error => response.status(500).json(error));
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
