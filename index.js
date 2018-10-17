const express = require('express');
const helmet = require('helmet');
const knex = require('knex');


const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req,res) =>{
  res.status(200).send("You have reached the zoo api")

})

server.get('/api/zoos', (req, res)=>{
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => {
    res.send(err.message)
  })
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const zooId = { id };
   db('zoos').where(zooId).first()
   .then(zoo => {
  res.status(200).json(zoo)
  })
  .catch(err => {
    res.send(err.message)
  })
})

server.post('/api/zoos', (req, res) =>{
  const zoo = req.body;
  db.insert(zoo)
    .into('zoos')
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => res.send(err.message))
})

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const zooId = { id };
  const editedZoo = req.body;
  db('zoos')
  .where(zooId)
  .update(editedZoo)
  .then(zoo => {
    res.status(200).json(zoo)
  })
  .catch(err => res.send(err.message))
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const zooId = { id };
  db('zoos')
  .where(zooId)
  .del()
  .then( removed => {
    res.status(202).json(removed)
  })
  .catch(err => res.send(err.message))
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
