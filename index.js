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

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
