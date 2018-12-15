const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile.js');


const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if (zoo.name) {
    db('zoos').insert(zoo)
    .then(id => {
      res
        .status(201)
        .json(id)
    })
    .catch(err => {
      res
        .status(500)
        .json({message: 'The zoo could not be inserted.'});
    });
  }
  else {
    res
      .status(400)
      .json({message: 'Please include the zoo name.'});
  }
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({message: 'The zoos information could not be retrieved at this time.'});
    });
});

server.get('/api/zoos/:id', (req, res) =>{
  const { id } = req.params;
  db('zoos').where('id', id)
    .then(rows => {
      if (rows.length > 0) {
        res
          .json(rows);
      }
      else {
        res
          .status(404)
          .json({message: 'The zoo with the specified ID does not exist.'})
      }
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({message: 'The zoo information could not be retrieved at this time.'})
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
