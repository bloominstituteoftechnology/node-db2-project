const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => {
  console.log(db('zoos'))
  db('zoos').then(zoos => res.status(201).json(zoos)).catch(err => res.status(500).json(err))
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').where({ id }).then(zoo => res.status(201).json(zoo)).catch(err => res.status(500).json(err))
  
})

server.post('/api/zoos', (req, res) => {
  const newZoo = req.body;
  db.insert(newZoo).into('zoos').then(zoo => res.status(201).json(zoo)).catch(err => res.status(500).json(err))

})

server.put('/api/zoos/:id', (req, res) => {
  const updated = req.body;
  const { id } = req.params;
  db('zoos').where({ id }).update(updated).then(zoo => res.status(201).json(zoo)).catch(err => res.status(500).json(err))
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos').del(id).then(zoo => res.status(200).json(zoo)).catch(err => res.status(500).json(err))
})




//server
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
