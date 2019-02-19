const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger("dev"));
// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n
  -----------------------------------------------------
   Web API Listening on http://localhost:${port} ===\n
  -----------------------------------------------------
   `);
});
