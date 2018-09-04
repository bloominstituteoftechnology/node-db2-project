const express = require('express');
const helmet = require('helmet');
const morgan=require('morgan');
const server = express();
const knex=require('knex');
server.use(express.json()).use(helmet()).use(morgan('dev'));

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true,
});
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
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
