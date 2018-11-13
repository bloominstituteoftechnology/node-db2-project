const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();
const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());


// endpoints here
server.post('/api/zoos', (req, res) => {
  const animal = req.body;
  db('zoos').insert(animal)
            .then(animal => {
              res.status(201).json(animal);
            })
            .catch(err => res.status(500).json({ message: 'error', err}))
})

server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(animal => {
    res.status(201).json(animal);
  })
  .catch(err => res.status(500).json({message: 'error', err}))
})

server.get('/api/zoos/:id', (req, res) => {
   const  id  = req.params;
   db('zoos')
   .where(id)
   .then(id => {
     res.status(201).json({id})
   })
   .catch(err => res.status(500).json({message: 'error', err}))
})

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
  .where({ id: id})
  .del()
  .then(count => {
    res.status(201).json({ count })
  })
  .catch(err => {
    res.status(500).json({ message: 'error', err})
  })

})

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where({ id: id})
    .update(changes)
    .then(count => {
      res.status(201).json({ count })
    })
    .catch(err => {
      res.status(500).json(err)
    })
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
