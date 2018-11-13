const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

 server.get('/api/zoos', (req, res) => {
  db('zoos').select().then(r => res.status(200).json(r)).catch(err => res.status(500).json({message: 'An error occurred while retrieving the data.'}))
});

  server.get('/api/zoos/:id', async (req, res) => {
    const {id} = req.params;
    try{
      
    const zoo = await db('zoos').select().where({id});
    
    if(zoo.length){
     
      res.status(200).json(zoo);
    }
    else{
      res.status(404).json({message: 'ID not found.'})
    }
    
    }

    catch(err){
      res.status(500).json({message: 'An error occurred while retrieving the data.'})
    }
    
    
}); 

 server.post('/api/zoos', (req, res) => {
   const zoo = req.body;
  db('zoos').insert(zoo).then(zoo => res.status(200).json(zoo))
  .catch(err => res.status(500).json({message: 'An error occurred while retrieving the data.'}))
});

 server.put('/api/zoos/:id',  async (req, res) => {
  const changes = req.body;
  const {id} = req.params;
  
  
  try{
    
    const zoo = await db('zoos').select().where({id});
    
    if(zoo.length){
      let count = db('zoos')
      .where({id})  // or where({id: id})
      .update(changes);

res.status(200).json({count});
    }
    else{
      res.status(404).json({message: 'ID not found.'})
    }
    
  }

  catch(err){
    res.status(500).json(err)
  }

  
  
    
 
});



 server.delete('/api/zoos/:id', async (req, res) => {

  const {id} = req.params;
  try{
    
    const zoo = await db('zoos').select().where({id});
    
    if(zoo.length){
      let deleted = db('zoos')
      .where({id})  // or where({id: id})
      .del();

      res.status(200).json({message: 'Delete successful!'});
    }
    else{
      res.status(404).json({message: 'ID not found.'})
    }
    
  }

  catch(err){
    res.status(500).json(err)
  }

  
}); 



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

