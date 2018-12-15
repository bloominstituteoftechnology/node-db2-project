const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');

const db =knex(dbConfig.development)
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//POST /api/zoos

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if(zoo.name){
    db('zoos').insert(zoo)
    .then( id => {
      res
      .status(201)
      .json({message: `Zoo ${id} created`} )
    })
    .catch(err=>{
      res
      .status(500)
      .json({error: "There was an error while saving your zoo to the database"})
    })
  } else {
    res
    .status(400)
    .json({errorMessage: "Please provide a name for the zoo"})
  }
  
});

//GET /api/zoos



//GET /api/zoos/:id

//DELETE  /api/zoos/:id

//PUT /api/zoos/:id

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
