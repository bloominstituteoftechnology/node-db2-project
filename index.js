const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const server = express();

//connect to the database
const db = knex( knexConfig.development )

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('api working')
});


//list
server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err))
})

//add

server.post('/api/zoos', (req, res) => {
  db('zoos').insert(req.body).then(zoo => {
    res.status(200).json(zoo)
  }).catch()
})

//delete

server.delete('/api/zoos/:id', (req, res) => {
  const id = req.params.id
  db('zoos').where('id', id).del().then(zoo => {
    res.status(200).json(zoo)
  })
  .catch(err => res.status(500).json(err))
})

//update

server.put('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;

  db('zoos')
  .where('id', id)
  .update(changes).then(change => {
    res.status(200).json(change)
  })
  .catch(err => res.status(500).json(err))
})

//connecting to the API
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
