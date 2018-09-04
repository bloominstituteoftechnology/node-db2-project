const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

// https://github.com/LambdaSchool/db-zoos/pull/56

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/zoos', (req, res)=>{
  db('zoos')
  .select('name')
  .then((data) => {
    res.status(200).json(data)
  })
  .catch(err => {
    console.log('get error: ', err);
    res.status(500).json({message: 'Unable to request zoos'})
  })
});

server.get('/zoos/:id', (req, res) => {
  db('zoos')
    .select('name')
    .where({id: req.params.id})
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log('get error: ', err);
      res.status(500).json({ message: 'Unable to request zoos' })
    })
});

server.post('/zoos', (req, res)=>{
  let zoo = req.body;
  db.insert(zoo)
    .into('zoos')
    .then(id => {
      res.status(201).json(id);
    })
    .catch( err => {
      console.log('Error: ', err);
      
      res.status(500).json({message: 'Zoo was not created. Please, make sure a zoo name was provided.'})
    })
});

server.put('/zoos', (req, res)=>{
  let id = req.body.id;
  console.log(id);
  
  db('zoos')
    .where('id', id)
    .update(req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {

      res.status(500).json({message:` ${err}`})
    })
})

server.delete('/zoos', (req, res)=>{
  let id = req.body.id;
  db('zoos')
    .where('id', id)
    .del()
    .then(data => {
      res.status(204).json({message: 'Zoo deleted'})
    })
    .catch(err => {
      res.status(504).json({message: `Unable to delete zoo: ${req.body.name}`});
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
