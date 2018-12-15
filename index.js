const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const knex = require('knex');
const dbconfig = require('./knexfile')

const server = express();
const db = knex(dbconfig.development)

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'))

// endpoints here

server.get('/api/zoos', (req, res) =>{
  db('zoos')
  .then(rows =>{
    res.json(rows)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to retrieve information'})
  })
})

server.post('/api/zoos',(req, res) =>{
  const zoos = req.body
  db('zoos').insert(zoos)
  .then(ids =>{
    res
    .status(201)
    .json(ids)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to save information to database'})
  })
})

server.get('/api/zoos/:id',(req, res) =>{
  const { id } = req.params
  db('zoos').where('id', id)
  .then(rows =>{
    res.json(rows)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to retrieve specified id '})
  })
})

server.delete('/api/zoos/:id',(req, res) =>{
  const { id } = req.params
  db('zoos')
  .where('id',id)
  .del()
  .then(rowCount =>{
    res
    .status(201)
    .json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to delete specified id '})
  })
})

server.put('/api/zoos/:id',(req, res) => {
  const { id } = req.params
  const zoo = req.body
  db('zoos')
  .where('id', id)
  .update(zoo)
  .then(rowCount=>{
    res.json(rowCount)
  })
  .catch(err =>{
    res
    .status(500)
    .json({message:'unable to modify specified id'})
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
