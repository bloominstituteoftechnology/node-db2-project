const express = require('express');
const helmet = require('helmet');
const knex = require("knex");

const dbconfig = require("./knexfile");
const db = knex(dbconfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req,res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err))
});

server.get('/api/zoos/:id', (req,res) => {
  db('zoos')
  .where({ id: req.params.id })
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(err => res.status(500).json(err))
});

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  if(!zoo) {
    res.status(400).status({ message: "Please provide zoo name."})
  }
  db.insert(zoo)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => res.status(500).json(err))
});

server.delete('/api/zoos/:id', (req,res) => {
  db('zoos')
  .where({ id: req.params.id})
  .del()
  .then(count => {
    if(count) {
      res.status(204).end()
    } else {
      res.status(404).json({ message: "There was no zoo with this id found"})
    }
  })
  .catch(err => res.status(500).json(err))
});

server.put('/api/zoos/:id', (req,res) => {
  const zoo = req.body;
  db('zoos')
  .where({id: req.params.id})
  .update(zoo)
  .then(zoo => {
    if(zoo) {
      res.status(200).json({ message: "This zoo has been updated"})
    } else {
      res.status(404).json({ message: "No zoo with thi id was found"})
    }
  })
  .catch(err => {
    res.status(500).json({ message:"Update Failed"})
  })
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});


