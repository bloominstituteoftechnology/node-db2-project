const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

server.get('/api/zoos', (req, res)=>{
  db('zoos')
  .then(data=>{
    res.json(data);
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to retrieve data'});
  })
})

server.get('api/zoos/:id', (req, res)=>{
  
})

server.post('/api/zoos', (req, res)=>{
  const zoo = req.body;
  if(zoo.name){
    db('zoos')
    .insert(zoo)
    .then(id=>{
      res.status(201).send(`${id[0]}`);
    })
    .catch(err=>{
      res.status(500).json({error: 'Failed to add data to database'});
    })
  }
  else{
    res.status(400).json({errorMessage: 'Please include the name of the zoo'});
  }
})

server.delete('api/zoos/:id', (req, res)=>{
  
})

server.put('api/zoos/:id', (req, res)=>{
  
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
