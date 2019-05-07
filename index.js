const express = require('express');
const helmet = require('helmet');
const zooRouter = require('./zoo-router')
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.use('/api/zoos', zooRouter);
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
