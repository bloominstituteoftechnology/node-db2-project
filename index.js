//create express server 
const express = require('express');
const server = express();

//Create db / knex connection
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

//Built in and 3rd party middleware
server.use(express.json());
const helmet = require('helmet');
server.use(helmet());

// endpoints here


//Listener
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
