const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const server = express();

const zoosRoute = require("./zoos");
const bearsRoute = require("./bears");

server.use(express.json());
server.use(helmet());
server.use(logger("dev"));
server.use(cors());

server.use("/api/zoos", zoosRoute);
server.use("/api/bears", bearsRoute);

const port = 4000;
server.listen(port, function() {
  console.log(`\n
  -----------------------------------------------------
   Web API Listening on http://localhost:${port} ===\n
  -----------------------------------------------------
   `);
});
