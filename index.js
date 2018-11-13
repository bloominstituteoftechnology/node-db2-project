const express = require('express');
const helmet = require('helmet');
const knexConfig = require('./knexfile.js');
const knex = require('knex');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

server.post('/api/zoos', (req,res) => {
  const zoo = req.body;
  if(zoo.name === undefined) {
    res.status(400).json({message: "Please provide a zoo name"})
  } else if (zoo.name.length = 0) {
    res.status(400).json({message: "Zoo name too short"})
  } else {
    db('zoos')
    .insert(zoo)
    .then(id => {
      res.status(201).json(id)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  }
})

server.get('/api/zoos', (req,res) => {
  db('zoos')
  .then(zoos =>  
    res.status(200).json(zoos))
  .catch(err => 
    res.status(500).json({message: "Zoos could not be found"}))
})

server.get('/api/zoos/:zooID', (req,res) => {
  const {zooID} = req.params;
  db('zoos')
  .where({id: zooID})
  .then(zoo => {
    res.status(200).json(zoo)
  })
  .catch(error => {
    res.status(404).json({message: "Zoo could not be found"})
  })
})

server.delete('/api/zoos/:zooID', (req, res) => {
  const {zooID} = req.params;
  db('zoos')
  .where({id: zooID})
  .del()
  .then(count => {
    if(count > 0) {
      res.status(200).json(count)
    } else {
      res.status(404).json({message: "Zoo could not be found"})
    }
  })
  .catch(error => {
    res.status(500).json({message: "Zoo could not be deleted"})
  })
})

server.put('/api/zoos/:zooID', (req,res) => {
  const {zooID} = req.params;
  const updates = req.body;
  if(updates.name === undefined) {
    res.status(400).json({message: "Please provide a zoo name"})
  } else if (updates.name.length = 0) {
    res.status(400).json({message: "Zoo name too short"})
  } else {
    db('zoos')
    .where({id: zooID})
    .update(updates)
    .then(count => {
      if(count > 0) {
        res.status(200).json(count)
      } else {
        res.status(404).json({message: "Zoo could not be found"})
      }
    })
    .catch(error => {
      res.status(500).json({message: "Zoo could not be updated"})
    })
  }
})
