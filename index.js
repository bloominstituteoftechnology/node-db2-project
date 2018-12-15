const express = require("express");
const server = express();

const helmet = require("helmet");
const morgan = require("morgan");

const zooRouter = require("./routers/zooRouter");
const bearRouter = require("./routers/bearRouter");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

// endpoints here
server.use("/api/zoos", zooRouter);
server.use("/api/bears", bearRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
