const express = require('express');
const knex = require('knex');       //require from local install
const helmet = require('helmet');

const dbConfig = require('./knexfile');    //require from knexfile.js


const server = express();
const db = knex(dbConfig.development);    // the only module in knexfile.js

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req , res) => {
  res.send(`We are live on PORT ${port}` )
})

// INSERT INTO zoos (name)
server.post('/api/zoos', (req , res) => {
  const zoo = req.body;
  console.log('zoo info', zoo)

  db('zoos').insert(zoo)
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: "Failed to insert zoo"});
  })
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
