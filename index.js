const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos')
  	.then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ error: `Server error --> ${err}` }))
});

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .first()
    	.then(zoo => {
        if(zoo) {
          res.status(200).json(zoo)
        } else {
          res.status(404).json({ error: "No record found." })
        }
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}` }))
});


server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into('zoos')
      .then(ids => res.status(201).json({ id: ids[0] }))
      .catch(err =>{ 
        if(err.errno === 1) {
          res.status(400).json({ error: "Error with name." })
        } else if(err.errno === 19) {
          res.status(404).json({ error: "Zoo is already in the database." })
        } else {
          res.status(500).json({ error: `Server error --> ${err}` })
        }
      })
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
      .then(count =>{
        if(count) {
          res.status(200).json({ message: "Zoo deleted." })
        } else {
          res.status(404).json({ error: "No Zoo with this id." })
        }
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}` }))
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const change = req.body;

  db('zoos')
    .where({ id })
    .update(change)
    	.then(count => {
        if(count) {
          res.status(200).json({ message: "Update successful." })
        } else {
          res.status(404).json({ error: "Zoo not found." })
        }
      })
      .catch(err => res.status(500).json({ error: `Server error --> ${err}` }))
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
