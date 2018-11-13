const express = require('express');
const knex = require('knex')
const helmet = require('helmet');
const server = express();

const knexConfig = require('./knexfile');
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req,res) => res.send({"API": "live"}));


const port = process.env.PORT || 9000;
server.listen(port, function() {console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)});