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
  zoo.name?
  db('zoos').insert(zoo)
    .then(id=>{
      res.status(201).json(id)
    })
    .catch(err=>{
      res.status(500).json({err: "Something happend while adding your Data"})
    }):res.status(400).json({err: "Please add a name and try again"})
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
  const {id} = req.params;
  
  db('zoos').where('id', id).then(zoo=>{
    zoo[0]?res.json(zoo)
    :res.status(404).json({err: "No zoo with this ID found"})
  })
  .catch(err=>{
    res.status(500).json("We experienced a problem looking for that ID")
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
