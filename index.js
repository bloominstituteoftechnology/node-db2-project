const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// server set up

server.get('/', (req, res) => {
  res.send("It's Alive");
});

// endpoints here

// create courses

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
server.post('/api/courses', (req, res) => {
  //grab data from body
  const course = request.body;
  //save to dababase
  db.insert(course)
    .into('courses')
      .then(ids => {
        //return id of newly created record
        res.status(201).json(ids);
      })
        .catch(err => {
          res.status(500).json(err);
        })
});

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

server.get('/api/zoos', (request, response) => {
   db('zoos')
    .then(zoos => response.status(200).send(zoos))
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

  server.put('/api/zoos/:id', (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
  
    db('zoos')
    .where({ id })
    .update({ name })
    .then(updated => {
      if(!updated || updated < 1) {
      return response.status(400).send({errorMessage:"Unable to update the Zoo with the provided id."})
      }
      response.status(200).json(updated)
  })
    .catch(error => response.status(500).send(error))
  })

  server.delete('/api/zoos/:id', (request, response) => {
    const { id } = request.params;
  
    db('zoos')
    .where({ id })
    .del()
    .then(deleted => {
      if(!deleted || deleted < 1) {
      return response.status(400).send({errorMessage:"Unable to delete the Zoo with the provided id."})
      }
      response.status(200).json(deleted)
  })
    .catch(error => response.status(500).send(error))
  })
  





server.listen(9000), () => console.log('\nAPI running on 9k\n')