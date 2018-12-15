const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const dbConfig = require('./knexfile')
const db = knex(dbConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post('/api/zoos', (req,res) => {
  const zoo = req.body;
  db('zoos').insert(zoo)
  .then(ids => {
    res.status(201).json(ids)
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err:"Item was unable to post to database"})
})
});

server.get('/api/zoos', (req, res) => {
   db('zoos')
   .then(zoo => {
     res.json(zoo)
   })
   .catch(err => {
     res.status(500).json({err: "Unable to fetch data."})
   })
})

server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params
  db('zoos')
  .where('id', id)
  .then(zoo => {
    res.json(zoo)
  })
  .catch(err => {
    res.status(500).json({err:`Failed to find zoo with the id of ${id}`})
  })
})

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const {id} = req.params;

  db('zoos')
  .where('id', '=', id)
  .update(changes)
  .then(count => {
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json({err: `Item with id of ${id} was unable to update.`})
  })
})


server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params;

  db('zoos')
    .where({id})
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({err: `Item with id of ${id} was unable to delete.`})
    })
})



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
