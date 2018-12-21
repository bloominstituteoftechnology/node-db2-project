const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const server = express();
const db = knex(dbConfig.development);
server.use(express.json());
server.use(helmet());

// endpoints here
const port = 3300;
server.get('/api/zoos', (req,res) => {
   db('zoos').then(ids => {
        res.json(ids);
   })
});
server.post();
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
