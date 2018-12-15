const express = require('express');
const helmet = require('helmet');
const db = require('./data/model');

// const knex = require('knex');
// const knexConfig = require('./knexfile');
// const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  db.get()
    .then(zoos => {
      res.json(zoos)
    })
    .catch(err => {
      res.status(500).json({ message: "Could not fetch Zoos" })
    })
});


server.get('/:id', (req, res) => {
  const {id} = req.params;
  db.get(id)
    .then(zoo => {
      if(Object.keys(zoo).length === 0){
        res.status(404).json({ message: "Invalid Zoo ID" })
      } else {
        res.json(zoo)
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not find that Zoo" })
    })
});

server.post('/', (req, res) => {
  const zoo = req.body;
  //Add check for existing Zoo name, throw error if duplicate
  if(zoo.name){
    db.insert(zoo)
      .then(newZoo => {
        res.status(201).json(newZoo)
      })
      .catch(err => {
        res.status(500).json({ message: "Unable to add this new zoo" })
      })
  } else{
    res.status(400).json({ message: "New zoos require a name" })
  }
})

server.put('/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;

  if(zoo.name){
    db.get(id)
      .then(response => {
        if(Object.keys(response).length === 0){
          res.status(400).json({ message: "That Zoo ID is invalid" })
        } else {
          db.update(id, zoo)
          .then(response => {
            res.json(response)
          })
          .catch(err => {
            res.status(500).json({ message: "Unable to update this Zoo" })
          })
        }
      })
  } else {
    res.status(400).json({ message: "Every Zoo needs a name!" })
  }
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
