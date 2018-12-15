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
})

server.get('/:id', (req, res) => {
  const {id} = req.params;
  db.get(id)
    .then(zoo => {
      console.log('get zoo', zoo);
      res.json(zoo)
    })
    .catch(err => {
      console.log('zoo error', err)
      res.status(500).json({ message: "Could not find that Zoo" })
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
