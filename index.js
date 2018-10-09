const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const knexConfig = require('./knexfile.js')

const db = knex(knexConfig.development)


const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req,res) => {
  db('zoos').then(zoos => {
    res.json(zoos)
  })
})

server.get('/api/zoos/:id', (req,res) => {
  const {id} = req.params
  db('zoos')
  .where({id:id})
  .then(zoo => {
    res.json(zoo)
  })
})

server.post('/api/zoos', (req,res) => {
  const name = req.body;

  db.insert(name)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids[0]);
  })
  .catch(err => {
    res.status(500).json(err);
  })

})

server.put('/api/zoos/:id', (req,res) => {
  const NewName = req.body;
  const { id } = req.params;
  db('zoos').where({id: id})
  .update(NewName).then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  });
})

server.delete('/api/zoos/:id', (req,res) => {
  const { id } = req.params;
  db('zoos').where({id: id})
  .del().then(count => {
    res.status(200).json(count)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
