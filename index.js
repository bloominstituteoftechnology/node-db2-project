const express = require('express');
const helmet = require('helmet');
const knex = require('knex'); 

const dbConfig = require('./knexfile'); 

const server = express();
const db = knex(dbConfig.development); 

server.use(express.json());
server.use(helmet());


server.get("/api/zoos", (req,res)=> {
  db('zoos').then(zoos => {
    res.status(200).json(zoos); 
  }).catch(err => {
    res.status(500).json({err}); 
  }); 
})

server.get("/api/zoos/:id", (req, res) => {
  const id = req.params.id; 
  db('zoos').where({id}).then(zoo => {
    res.status(200).json(zoo);
  }).catch(err => {
    res.status(500).json({err}); 
  })
})

server.post("/api/zoos", (req,res) => {
  const newZoo = req.body; 
  db.insert(newZoo).into('zoos').then(id => {
    res.status(200).json(id); 
  }).catch(err => {
    res.status(500).json({err})
  })
})

server.delete("/api/zoos/:id", (req,res) => {
  const id = req.params.id; 
  db('zoos').where({id}).del().then(count => {
    res.status(200).json({message: "Deleted Successfully"}); 
  }).catch( err => {
    res.status(500).json({err});
  })
})

server.put("/api/zoos/:id", (req,res) => {
  const id = req.params.id; 
  const data = req.body 
  db('zoos').where({id}).update(data).then(count =>{
    res.status(200).json({message: "Successfully updated database"})
  }).catch(err => {
    res.status(500).json({err}); 
  })
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
