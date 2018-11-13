const express = require('express');
const helmet = require('helmet');
//import knex
const knex  =require('knex');
//import our knex file
const knexConfig = require('./knexfile.js');
//define database using knex/knexConfig and the specific module(development)
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.json({api: 'exists'})
})

server.post('/api/zoos', (req, res) =>{
  const zoo = req.body;
  //reference the specifc 'zoos' table in the db
  if (!zoo.name) {
res.status(400).json({message: "Please include a name for the submitted zoo."})
  } else {
  db('zoos').insert(zoo)
.then(id =>{res.status(201).json(id)})
.catch(err=>res.status(500).json({error: "Error inserting the submitted zoo."}))
  }
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos=>{res.status(200).json(zoos)})
  .catch(err => {res.status(500).json({message: "An error occurred while retrieving the list of zoos."})})
})

server.get('/api/zoos/:id', (req, res) => {
  const zooId = req.params.id;
db('zoos')
.where({id: zooId})
.then(zoo => {

  if (zoo) {    
    res.status(200).json(zoo)
  } else {
    res.status(404).json({message: "The zoo with the specified id does not exist."})
  }
})
.catch(err => res.status(500).json({error: "An error occurred while retrieving this zoo."}))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
