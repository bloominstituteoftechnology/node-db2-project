const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const zooDb = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

// endpoints here
server.get('/api/zoos', (request, response) => {
  zooDb('zoos')
    .then(zoos => {
      return response
        .status(200)
        .json(zoos);
    })
    .catch(() => {
      return response
        .status(500)
        .json({ Error: "Could not find list of zoos." })
    });
});

server.get('/api/zoos/:id', (request, response) => {
  const id = request.params.id;

  zooDb('zoos')
    .where({ id })
    .then(zoo => {
      console.log(zoo);
      if (!zoo) {
        return response
          .status(404)
          .json({ Error: "Could not find zoo." })
      } else return response
        .status(200)
        .json(zoo);
    })
    .catch(() => {
      return response
        .status(500)
        .json({ Error: "Zoo info could not be retrieved." })
    });
});

server.post('/api/zoos', (request, response) => {
  const name = request.body.name;
  const newZoo = { name };

  if (!newZoo.name) {
    return response
      .status(400)
      .send({ Error: "Missing name for the zoo" });
  }

  zooDb
    .insert(newZoo)
    .into('zoos')
    .then(ids => {
      return response
        .status(201)
        .json(ids[0]);
    })
    .catch(() => {
      return response
        .status(500)
        .json({ Error: "There was an error while saving the zoo" })
    });
});

server.put('/api/zoos/:id', (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const updatedZoo = { name };

  if (!id) {
    return response
      .status(404)
      .send({ Error: `Zoo with the following ID does not exist: ${id}` });
  } else if (!updatedZoo.name) {
    return response
      .status(400)
      .send({ Error: "Please enter name for the zoo" });
  }

  zooDb('zoos')
    .where('id', '=', id)
    .update(updatedZoo)
    .then(zoo => {
      return response
        .status(200)
        .json(zoo);
    })
    .catch(() => {
      return response
        .status(500)
        .json({ Error: "The zoo info could not be modified" })
    });
});

server.delete('/api/zoos/:id', (request, response) => {
  const id = request.params.id;

  if (!{ id }) {
    return response
      .status(404)
      .json({ Error: `There is no zoo with the following ID: ${id}` })
  }

  zooDb('zoos')
    .where({ id })
    .del()
    .then(removedZoo => {
      return response
        .status(200)
        .json(removedZoo);
    })
    .catch(() => {
      return response
        .status(500)
        .json({ Error: "The zoo could not be removed" })
    });
});