const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();


server.use(express.json());
server.use(helmet());

// endpoints here:
server.get('/api/zoos', (req, res) => {
  db
      //.select().table('zoos') to get full table including IDs
      .select('name').from('zoos')
      .then(response => {
          res.status(200).json(response);
      })
      .catch(err => {
          res.status(500).json(err)
      })
});

server.get('/api/zoos/:id', (req, res) =>  {
  const {id} = req.params;
  db('zoos')
    .select("*").where("id", "=", id)
    .update(updatedZoo)
    .into('zoos')
})

server.post('/api/zoos', (req, res) => {
  const newZoo = req.body;
  db
      .insert(newZoo)
      .into('zoos')
      .then(response => {
          res.status(200).json(response);
      })
      .catch(err => {
          res.status(500).json(err);
      })
}); 

server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const {name} = req.body;
  db('zoos')
    .where('id', '=', id)
    .update({
      name: name
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
    .where('id', '=', id)
    .del()
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});





// Server Listen:
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
