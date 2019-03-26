const express = require('express');
const helmet = require('helmet');

const server = express();
const zoosRouter = require('./zoos-router.js');

server.use(express.json());
server.use(helmet());

// endpoints here
server.use('/api/zoos', zoosRouter);

const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
