const express = require('express');
const helmet = require('helmet');
const knex = require('knex'); 

const dbConfig = require("./knexfile"); 

const db = knex(dbConfig.development); 

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/", (req, res)=>{
  res.send("API Running..."); 
})

server.get("/zoos", (req, res)=>{
  db('zoos')
  .then(zoos => res.status(200).json(zoos))
  .catch(err => res.status(500).json(err)); 
})

// server.get("/zoos/:id", (req, res)=>{
//   const id = req.params.id; 
//   db("zoos")
//   .where(id)
//   .then(zoos =>{
//     if(zoos === 0){
//       res.status(404).json({message: "error getting id"})
//       return
//     }
//     res.json(zoos, {message: "working"}); 
//   })
//   .catch(err => res.status(500).json(err)); 
// })
server.get('/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
    .where({ id })
    .then(zoo => res.status(200).json(zoo))
    .catch(err => res.status(500).json(err));
});

server.post('/zoos', (req, res)=>{
  const animal = req.body; 

  console.log(animal)
  db.insert(animal)
  .into("zoos")
  .then(ids =>{
    res.status(201).json(ids);
  })
  .catch(err => res.status(500).json(err)); 
}); 

server.delete('/zoos/:id', (req, res)=>{
  const { id } = req.params; 
  db('zoos')
  .where({id})
  .del()
  .then(count =>{
    if(count) res.status(200).json(count); 
    else res.status(404).json({error: "the animal was not found"})
  })
  .catch(err => res.status(500).json(err)); 
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
