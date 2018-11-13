const express = require('express');
const helmet = require('helmet');
const zoos = require('./routes/api/zoos');
const bears = require('./routes/api/bears');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.use('/api/zoos', zoos);
server.use('/api/bears', bears);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
