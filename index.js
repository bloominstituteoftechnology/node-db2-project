const express = require('express');
const helmet = require('helmet');

const knex = require('knex');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

// endpoints here

//Get all Zoos
server.get('/api/zoos', (req, res) => {
  db.select().from('zoos')
  .then(zoos => {
      res.status(200).json(zoos);
  })
  .catch(err => {
      res.status(500).json({ error: "Couldn't get list of zoos; please try again." });
  })
});

//Get individual Zoo by ID
server.get('/api/zoos/:id', (req, res) => {

  const { id } = req.params;

  db.select('id').from('zoos')
  .then(zoo => {
      res.status(200).json(zoo);
  })
  .catch(err => {
      res.status(500).json({ error: "Couldn't get the requested zoo record; please try again." });
  })
});

//Create a new 'Zoo' table in the database
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into('zoos')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//Update a Zoo record
server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  db('zoos')
    .where({id: id})
  .then(zoo => {
      if (zoo) {
          res.status(200);
      } else if (zoo.name.length === 0){
          res.status(400).json({ errorMessage: "Please provide the name of the Zoo you'd like to remove." })
      } else {
          res.status(404).json({ message: "A Zoo with the specified ID does not exist." })
      }
  })
  .catch(err => {
      res.json(500).json({ error: "This Zoo's information could not be modified." })
  })
})

// Removing a Zoo from the database
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(zoo => {
        if (zoo) {    
            res.status(200).json(zoo);
        } else {
            res.status(404).json({ message: "The Zoo record with the specified ID does not exist." })
        }
    })
        .catch(err => {
        res.status(500).json({message: "The requested Zoo record could not be removed"});
    })
});


