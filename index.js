const express = require('express');
const helmet = require('helmet');
const morgan=require('morgan');
const server = express();
const knex=require('knex');
const dbConfig=require('./knexfile');
server.use(express.json()).use(helmet()).use(morgan('dev'));

const db = knex(dbConfig.development);
// endpoints here
server.get('/api/zoos',(req,res)=>{
  db('zoos').select('name').then(zoos=>res.status(200).json(zoos)).catch(err=>res.status(500).json(err));
})
server.post('/api/zoos',(req,res)=>{
  const zoo=req.body;
  db.insert(zoo).into('zoos').then(id=>res.status(201).json(id)).catch(err=>res.status(500).json(err));
})
server.get('/api/zoos/:id',(req,res)=>{
  db('zoos').where(({'id':req.params.id})).then(row=>res.status(200).json(row)).catch(err=>res.status(500).json(err));
})
server.delete('/api/zoos/:id',(req,res)=>{
  db('zoos').where({'id':req.params.id}).del().then(count=>res.status(200).json(count)).catch(err=>res.status(500).json(err));
})
server.put('/api/zoos/:id',(req,res)=>{
  const zoo=req.body;
  db('zoos').where({'id':req.params.id}).update(zoo).then(count=>res.status(200).json(count)).catch(err=>res.status(500).json(err));
})
server.get('/api/bears',(req,res)=>{
  db('bears').select('name').then(bears=>res.status(200).json(bears)).catch(err=>res.status(500).json(err));
})
server.post('/api/bears',(req,res)=>{
  const bear=req.body;
  db.insert(bear).into('bears').then(id=>res.status(201).json(id)).catch(err=>res.status(500).json(err));
})
server.get('/api/bears/:id',(req,res)=>{
  db('bears').where({'id':req.params.id}).then(row=>res.status(200).json(row)).catch(err=>res.status(500).json(err));
})
server.delete('/api/bears/:id',(req,res)=>{
  db('bears').where({'id':req.params.id}).del().then(count=>res.status(200).json(count)).catch(err=>res.status(500).json(err));
})
server.put('/api/bears/:id',(req,res)=>{
  const bear=req.body;
  db('bears').where({'id':req.params.id}).update(bear).then(count=>res.status(200).json(count)).catch(err=>res.status(500).json(err));
})
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
