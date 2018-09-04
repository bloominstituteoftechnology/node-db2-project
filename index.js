const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile')

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  res.send('API is Running');
});

//POST Request
server.post('/api/zoos', (req, res) => {
  const name = req.body;
  console.log(name)
  if(!name) {
    res.status(400).json({message:  "Must provide a name in order to post a new record"})
    return;
  }
  db
  .insert(name)
  .into('zoos')
  .then(id => {
  res.status(201).json(id);
  })
  .catch(err => res.status(500).json({message:  err}));
  });

//GET Request for all records
server.get('/api/zoos', (req,res) => {
  db('zoos')
  .then(zoos => {
  res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json({message:  'Error retrieving data'}));
  });

//GET Request for individual record 
server.get('/api/zoos/:id', (req,res) => {
  const id = req.params.id;
  db('zoos')
  .where('id', '=', id)
  .then(zoo => {
    if (zoo.length == 0) {
      res.status(404).json({message: "Cannot find corresponding record "})
    }
    res.status(200).json(zoo);
  })
  .catch(err => res.status(500).json({message: "There was an error looking for the specified record"}));
})

//PUT Request
server.put('/api/zoos/:id', (req,res) => {
  const changes = req.body;
  const id = req.params.id;
  db('zoos')
  .where('id', '=', id)
  .update(changes)
  .then(count => { //tells the number of records updated
    res.status(200).json(count);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

server.delete('/api/zoos/:id', (req, res) => {
  const id = req.params.id;
  db('zoos')
    .where('id', '=', id)
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

