const express = require('express');
const helmet = require('helmet');

const knex = require('knex');
const dbconfigure = require('./knexfile');
const db = knex(dbconfigure.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('zoos', (req,res) => {
  db('zoos').select('name').then(zoo => {
    res.status(201).json(zoo);
  })
})

server.post('/zoos', (req, res)=> {
  const zoo = req.body;
  db('zoos').insert(zoo).then(ids => {
      res.status(201).json(ids);
  })
})




const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
