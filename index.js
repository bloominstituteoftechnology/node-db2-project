const express = require("express");
const helmet = require("helmet");
const server = express();

// ROUTES
const zoosRouter = require("./router/zoosRouter/");
const bearsRouter = require("./router/bearsRouter/");

const port = 3300;
server.use(express.json());
server.use(helmet());

// USE ROUTES
server.use("/api/zoos", zoosRouter);
server.use("/api/animals", bearsRouter);

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
