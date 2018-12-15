const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const db = knex ({
  client:'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true,
});

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post("/api/zoos", (req, res) => {});
server.get("/api/zoos", (req, res) => {});
server.get("/api/zoos", (req, res) => {});
server.put("/api/zoos", (req, res) => {});
server.delete("/api/zoos", (req, res) => {});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
