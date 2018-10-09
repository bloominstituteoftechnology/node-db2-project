const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req,res)=>{
  res.send("it's alive");
})


server.get('/api/zoos',(req,res)=>{
  db("zoos")
    .then(zoos=>{
      res.status(200).json(zoos);
    })
    .catch(err=>res.status(500).json(err));
})

server.get('/api/zoos/:id',(req,res)=>{
  const id = req.params.id;
  db("zoos").where({id})
    .then(zoos=>{
      if (zoos && zoos.length != 0){
        res.status(200).json(zoos[0]);
      } else {
        res.status(404).json({
          Error: "ID not found"
        })
      }
    })
    .catch(err=>res.status(500).json(err));
})

server.post('/api/zoos', (req, res)=>{
  const zoo = req.body;
  db.insert(zoo)
    .into('zoos')
    .then(id=>{
      res.status(201).json(id);
    })
    .catch(err=>res.status(500).json(err));
})

server.delete('/api/zoos/:id', (req, res)=>{
  const id = req.params.id;
  db("zoos").where({id}).del()
    .then(zoos =>{
      if (zoos && zoos.length != 0){
        res.status(200).json({
          Success: "ID deleted."
        });
      } else {
          res.status(404).json({
            Error: "ID not found"
          })
      }
    })
    .catch(err=>res.status(500).json(err));
})

server.put('/api/zoos/:id', (req, res)=>{
  const id = req.params.id;
  const newZoo = req.body;
  db("zoos").update(newZoo).where({id})
  .then(zoos =>{
    if (zoos && zoos.length != 0){
      res.status(200).json({
        Success: "ID updated."
      });
    } else {
      res.status(404).json({
        Error: "ID not found"
      })
    }
  })
  .catch(err=>res.status(500).json(err)); 
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
