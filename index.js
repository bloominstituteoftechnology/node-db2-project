const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dataConfig = require("./knexfile");

const dataBase = knex(dataConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// const port = 3300;
// server.listen(port, function() {
//   console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
// });

server.listen(3300, () =>
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`)
);
