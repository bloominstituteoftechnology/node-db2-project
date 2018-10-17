const express = require('express');
const helmet = require('helmet');
const knex = require('knex')
const server = express();
const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)



server.use(express.json());
server.use(helmet());

// endpoints here??

server.get('/api/zoos',(req,res)=>{
  db('zoos')
  .then(zoos=>{
    console.log('Success');
    res.status(500).json(zoos)
  })
  .catch(err=>{
    res.send(err)
  })
})

server.get('/api/zoos/:id',async(req,res)=>{
  try {
    const {id}= req.params;
    const zoos = await db('zoos').where({id}).first();
    if(zoos){
      res.status(200).json(zoos);
    }
    else{
      res.status(404).json({message:'zoo not found',})
    }
  } catch (e) {
    res.status(500).send(e)
  }
})




server.post('/api/zoos',(req,res)=>{
  const zoos = req.body;
  db.insert(zoos)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids[0]);
  })
  .catch(err=>{
    res.status(500).json(err)
  })
})





server.put('/api/zoos/:id',(req,res)=>{
  const{id} =req.params
  const changes =req.body;
  db('zoos')
  .where({id})
  .update(changes)
  .then(count=>{
    if(!count||count<1){
      res.status(404).json({message:'no record found'})
    }
    else{
      res.status(200).json(count);
    }
  })
  .catch(err=> res.status(500).json(err))
})
server.delete('/api/zoos/:id',(req,res)=>{
  const{id} =req.params
  db('zoos')
  .where({id})
  .del()
  .then(count=>{
    if(!count||count<1){
      res.status(404).json({message:'no record found'})
    }
    else{
      res.status(200).json(count);
    }
  })
  .catch(err=> res.status(500).json(err))
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
