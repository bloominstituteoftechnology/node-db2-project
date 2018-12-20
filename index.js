const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');
const server = express();
const db = knex(dbConfig.development)

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/zoos', (req, res)=>{
  const zoo = req.body;
  db('zoos').insert(zoo)
    .then(id=>{
      res.status(201).json(id)
    })
    .catch(err=>{
      res.status(500).json({err: "Something happend while adding your Data"})
    })
})

server.get('/zoos', (req, res)=>{
  db("zoos").then(zoos=>{
    res.json(zoos)
  })
  .catch(err=>{
    res.status(500).json({err: "Something went wrong looking for Zoos"})
  })
})

server.get('/zoos/:id', (req, res)=>{
  
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
