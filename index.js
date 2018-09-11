const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile.js')

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//---------GET REQUESTS-------//

//All:

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then( zoos => {
    res.status(200).json(zoos);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
})
//BY ID:

server.get('/api/zoos/:id', (req, res) => {
  const  {id} = req.params;
  db('zoos')
  .select()
  .where('id', id)
  .then( zoos => {
    res.status(200).json(zoos);
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json(err)
  })
})

//----POST ------//

server.post( '/api/zoos', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
  .into('zoos')
  .then(zoos => {
    res.status(201).json(zoos);
  })
  .catch(err => {
    res.status(500).json(err);
  })
})

//-------DELETE------------//

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
   db('zoos')
   .where({ id })
   .del()
   .then( zoos => {
     res.status(200).json(zoos);
   })
   .catch(err => {
     console.log(err)
     res.status(500).json(err)
   })
})

//-------------PUT-----------//
server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const name = req.body;

  db('zoos')
  .where( { id })
  .update(name)
  .then( zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err);
  })
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
