const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile')

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.send('API is Running');
});

//POST Request
server.post('/api/zoos', (req, res) => {
  const name = req.body;
  console.log(name)
  db.insert(name)
  .into('zoos')
  .then(id => {
  res.status(201).json(id);
  })
  .catch(err => res.status(500).json(err));
  });

//GET Request for all records
server.get('/api/zoos', (req,res) => {
  db('zoos')
  .then(zoos => {
  res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err));
  });

//GET Request for individual record 
server.get('/api/zoos/:id', (req,res) => {
  const id = req.params.id;
  db('zoos')
  .where('id', '=', id)
  .then(zoo => {
    res.status(200).json(zoo);
  })
  .catch(err => res.status(500).json(err));
})

//PUT Request
server.put('/api/zoos/:id', (req,res) => {
  const changes = req.body;
  const id = req.params.id;
  db('zoos')
  .where('id', '=', id)
  .update(changes)
  .then(count => { //tells the number of records updated
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});




const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

