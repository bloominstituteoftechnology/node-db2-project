const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos')
            .then( zoos => res.status(200).json(zoos))
            .catch( error => res.status(500).json({ message: 'an error occured while retrieving data', error }))
})



server.get('/api/zoo/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({id: id})
    .then( zoos => res.status(200).json(zoos))
  .catch(error => res.status(500).json({message: 'an error occured while retrieving data', error}))
  
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db('zoos')
  .insert(zoo)
  .returning('id')
  .then( ids => {
    res.status(201).json(ids)
  })
  .catch( error => {
    res.status(500).json({ message: 'Error inserting zoo', error})
  })
})

server.put('/api/zoo/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where({ id: id})
    .update(changes)
    .then(count => {
      res.status(201).json(count)
    })
    .catch( error => {
      res.status(500).json({ message: 'error updating zoo', error })
    })
})

server.delete('/api/zoo/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id: id})
    .del()
    .then(count => {
      res.status(201).json(count)
    })
    .catch( error => {
      res.status(500).json({message: 'error deleting zoo', error})
    })

})









const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});