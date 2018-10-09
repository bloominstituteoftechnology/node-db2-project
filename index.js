const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

// const zoosRoutes = require('./routes/zoosRoutes.js');

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
// server.use('/api/zoos', zoosRoutes);

//POST Endpoint
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  if (!zoo) {
    res.status(404).json({error: "Please Provide Zoo Name"})
  }else {
    db
      .insert(zoo)
      .into('zoos')
      .then(ids => {
        res.status(201).json(ids[0]);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  }
});

//GET Endpoint
server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  db('zoos')
    .where({id})
    .then(zooId => {
      if (zooId.length === 0 || zooId === undefined){
        res.status(404).json({message: `No Zoo Record Found at Id ${id}`});
      }else {
        res.status(200).json(zooId);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
  
});

//PUT Endpoint
server.put('/api/zoos/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;

  db('zoos')
    .where({id})
    .update(changes)
    .then(count => {
      if (!count || count<1) {
        res.status(404).json({message: 'No Zoo Record Found to Update'});
      }else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

//DELETE Enpoint
server.delete('/api/zoos/:id', (req, res) => {
  const {id} = req.params;

  db('zoos')
    .where({id})
    .delete()
    .then(count => {
      if (!count || count<1) {
        res.status(404).json({message: 'No Zoo Record Found to Delete'});
      }else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});





const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
