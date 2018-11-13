const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());
const knex = require('knex');

const knexConfig = require('./data/knexfile.js');

const db = knex(knexConfig.development);

// endpoints here
server.post("/api/zoos", (req, res)=>{
  const name= req.body;
  db('zoos')
    .insert(name)
    .then(ids=>{
      res.status(201).json(ids);
    })
    .catch(error=>{
      res.status(500).json({message: "Error inserting", error});
    });
})
server.get('/api/zoos', (req, res)=>{
  db('zoos')
    .then(zoos=>res.status(200).json(zoos))
    .catch(error=>res.status(500).json(error));
});
server.put('/api/zoos/:id', (req, res)=>{
  const changes= req.body;
  const id= req.params;
  db('zoos')
    .where({id:id})
    .update(changes)
    .then(count=>{
      res.status(200).json({count});
    })
    .catch(error=>res.status(500).json(error));
});
server.delete('/api/zoos/:id', (req,res)=>{
  const {id}=req.params
  db('zoos')
    .where({id: id-1})
    .del()
    .then(count=>{
      res.status(200).json({count});
    })
    .catch(error=>res.status(500).json(error));
})
server.get('/api/zoos/:id', (req,res)=>{
  const{id}= req.params
  db('zoos').get(id-1)
    .then(animal => {
      if (animal) {
        res.status(200).json(animal)
      } else {
        res.status(404).json({message: 'animal not found'})
      }
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
})
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
