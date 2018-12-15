const express = require('express');
const server = express();

const helmet = require('helmet');
const morgan = require('morgan');

const zooRouter = require("./routers/zooRouter");

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

// endpoints here
server.use("/api/zoos", zooRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
