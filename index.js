const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');

const app = express();

const db = knex(knexConfig.development);

app.use(express.json());
app.use(helmet());

// endpoints here

const port = 9000;
app.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
