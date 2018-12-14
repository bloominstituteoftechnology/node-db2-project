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
      console.log('get response', zoos);
      res.json(zoos)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Could not fetch Zoos" })
    })
})

// server.get('/', (req, res) => {
//   db('zoos')
//     .then(response => {
//       console.log('get response', response);
//       res.json(response)
//     })
//     .catch(err => {
//       console.log('error:', err);
//       res.status(500).json({ message: "Could not fetch Zoos" })
//     })
// })

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
