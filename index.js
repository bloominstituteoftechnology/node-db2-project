const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
//POST /api/zoos
server.post('/api/zoos', async (req, res) => {
  try {
    const id = await db('zoos').insert(req.body);
    console.log(id);
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET /api/zoos
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json(error);
  }
});
//GET /api/zoos/:id
server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos').where({id: req.params.id})
    res.status(200).json(zoo);
  } catch (error) {
    res.status(500).json(error);
  }
});
//DELETE /api/zoos/:id
server.delete('/api/zoos/:id', (req, res) => {

});
//PUT /api/zoos/:id
server.put('/api/zoos/:id', (req, res) => {

});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
