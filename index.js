const express = require('express');
const knex = require('knex');
const helmet = require('helmet');

const dbConfig = require('./knexfile');


const server = express();
const db = knex(dbConfig.development);
const port = 3300;

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) =>{
  const zoo = req.body;
  if(!zoo.name){res.status(400).json({error:"Please include a name!"})}
    db('zoos').insert(zoo)
  .then(ids=>{
    res.status(201).json(ids)
  })
  .catch(err =>{
    res.status(500).json({error:"Unable to add the zoo."})
  })
})

server.get('/api/zoos', (req, res) =>{
  db('zoos')
  .then(zoos =>{
    if(zoos.length > 0){
      res.json(zoos)
    }else{
      res.status(404).json({error:"No zoos have been added"})
    }
  })
  .catch(err =>{
    res.status(500).json({error:"Unable to retrieve the Zoos from the database!"})
  })
  
})

server.get('/api/zoos/:id', async (req, res) =>{
 try {
   const { id } = req.params

   const zoo = await db('zoos')
   .where({ id })
   .first()
   if(zoo){
     res.json(zoo)
   }else{
     res.status(404).json({error: "The Zoo with the specified id does not exist!"})
   }
 } catch(err) {
    res.status(500).json({error:"Could not retrieve information from the database!"})
 }

  
})

server.delete('/api/zoos/:id', (req, res) =>{
  
})

server.put('/api/zoos/:id', (req, res) =>{
  
})

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
