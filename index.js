const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.json('Server is active!');
});

const port = 6000;

server.listen(port, () => {
  console.log(`API is listening on port ${port}`);
});
