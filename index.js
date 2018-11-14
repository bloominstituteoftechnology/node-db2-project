const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());


server.get('/',(req,res)=>{
  res.status(200).send('ok ok.. im up')
})
server.get('/api/zoos',async(req,res)=>{
  try {
    const response = await db('zoos').select('id','name')
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({message:error.toString()})
  }
})
server.post('/api/zoos',async(req,res)=>{
  const zoo = req.body;
  if (req.body.name){
    try {
      const response = await db('zoos').insert(zoo)
      res.status(201).json(response)
    } catch (error) {
      res.status(500).json({message:error.toString()})
    }
  } else {
    res.status(400).json(({message:"name is required"}))
  }
})

server.put('/api/zoos/:id',async(req,res)=>{
  const zoo = req.body;
  console.log("req.body",req.body) 
  try {
    const response = await db('zoos').update(zoo).where('id',req.params.id)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({message:error.toString()})
  }
})
server.delete('/api/zoos/:id',async(req,res)=>{
    const { id } = req.params;
    try {
      const response = await db('zoos').delete().where('id',id);
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({message:error.toString()})
    }
})
server.get('/api/zoos/:id',async(req,res)=>{
  const { id } = req.params;
  try {
    const response = await db('zoos').select().where('id',id)
    res.status(200).json(response)
  } catch (error) {
    res.status(500).json({message:error.toString()})    
  }

})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
