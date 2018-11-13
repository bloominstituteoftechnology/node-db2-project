//bringing in dependencies
const express = require('express');
const helmet = require('helmet');

//bringing in Knex to connect and access database
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);


//making the server use the dependencies we brought in
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: 'the request is missing necessary info: Name of the zoo' })
  } else {
    db('zoos')
      .insert(req.body)
      .into('zoos')
      .then(id => {
        res.status(201).json(id)
      })
      .catch(err => res.status(500).json({ message: 'the zoo could not be created. call the governor!' }))
  }
});

server.get('/', (req, res) => {
  res.json('you forgot to add the /api/zoos or whatever URL you should have put in');
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ error: 'The zoos could not be retrieved' }));
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .get(id)
    .then(zoo => {
      if (!zoo) {
        res.status(404).json({ message: 'a zoo with that ID cannot be found. I guess PETA won this battle' })
      }
      res.status(200).json(zoo)
    })
    .catch(err => res.status(500).json({ error: 'That zoo could not be retrieved' }))
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id: id })
    .del()
    .then(count => {
      if (count === 0) {
        res.status(404).json({ message: 'A zoo with that ID could be found for deletion, look harder' })
      }
      res.status(200).json({ count })
    })
    .catch(err => {
      res.status(500).json({ error: 'there was an error deleting this zoo' })
    })
});

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  db('zoos')
    .where({ id: id })
    .update(changes)
    .then(count => {
      if (count === 0) {
        res.status(404).json({ message: 'A zoo with that ID could be found for updating, look harder' })
      }
      res.status(200).json({ count })
    })
    .catch(err => res.status(500).json(err));
})

//calling the port for this API
const port = 3300;
server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
