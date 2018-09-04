const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig =require('./knexfile')

const db = knex(dbConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) =>{
  res.send('running')
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids)
    }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos=>{
    res.status(200).json(zoos)
  }).catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

server.get('/api/zoos/:id',  (req, res) => {
  const { id } =req.params;

  db('zoos')
    .where({ id })
    .then(zoos=>{
      res.status(200).json(zoos)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})


server.put('/api/zoos/:id', (req, res) => {
  const { id } =req.params;

  db('zoos')
    .where({ id })
    .update(req.body)
    .then(zoos=>{
      res.status(200).json(zoos)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
})

server.delete("/api/zoos/:id", async (req, res) => {
  const { id } =req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(zoos=>{
      res.status(200).json(zoos)
    })
    .catch(err => res.status(500).json({ error: "Unable to retrieve."}))
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
