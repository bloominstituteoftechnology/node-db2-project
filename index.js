const express = require('express');
const helmet = require('helmet');
const knex = require('knex'); 

const dbConfig = require('./knexfile'); 

const server = express();
const db = knex(dbConfig.development); 

server.get("/api/zoos", (req,res)=> {
  db('zoos').then(zoos => {
    console.log("This worked!"); 
    res.status(200).json(zoos); 
  }).catch(err => {
    res.status(500).json({err}); 
  }); 
})



server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
