const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());


// endpoints here


// Add a new zoo
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
db('zoos')
.insert(zoo)
.then(zooObj => {
  res.status(201).json(`Success! Added a new zoo. There are now ${zooObj} zoo(s) in the database.`)
})
.catch(err => {res.status(500).json(err)})
})

// Get a list of all zoo objects
server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err))
})


// Get a specific zoo object by id
server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  db('zoos')
  .where({id})
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err))
})

// Update a specific zoo by id
server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const {id} = req.params;
  
  db('zoos')
  .where({id})
  .update(changes)
  .then(count => res.status(200).json(`Success! You updated ${count} zoo(s).`))
  .catch(err => res.status(500).json(err))
})

server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  
  db('zoos')
  .where({id})
  .delete()
  .then(count => res.status(200).json(`Success! You deleted ${count} zoo(s).`))
  .catch(err => res.status(500).json(err))
})

// sanity check
server.get('/', (req, res) => {
 res.json({api: 'up'})
  })


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
