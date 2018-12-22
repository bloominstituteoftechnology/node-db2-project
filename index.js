const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const dbConfig = require('./knexfile')

const server = express();
const db = knex(dbConfig.development);
const port = 3300;

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req, res)=>{
  const zoo = req.body;
  if(!zoo.name){res.status(400).json({message:"Please provide a name"})}
  db('zoos').insert(zoo)
  .then(ids=>{
    res.status(201).json(ids)
  })
  .catch(err=>{
    res.status(404).json({error:"An error occurred in adding a zoo! "})
  })
})

server.get('/api/zoos', (req, res)=>{
  db('zoos')
  .then(rows=>{
    res.json(rows)
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({error:"Failed to find the Zoos!"})
  })
  
})

server.get('/api/zoos/:id', (req, res)=>{
  const { id } = req.params;
  db('zoos').where('id', id)
  .then(zoo=>{
    if(zoo){
      res.status(200).json(zoo)
    }else{
      res.status(404).json({error:"The Zoo with the specific id does not exist"})
    }
  }).catch(err=>{
    res.status(500).json({error:"Trouble getting the Zoo!"})
  })
  
})

server.delete('/api/zoos/:id', (req, res)=>{
  
})

server.put('/api/zoos/:id', (req, res)=>{
  
})



server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
