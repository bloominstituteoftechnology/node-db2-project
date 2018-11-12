const express = require('express');
const helmet = require('helmet');
const zooRoutes = require('./zoos');

const server = express();

server.use(express.json());
server.use(helmet());
server.use('/zoos', zooRoutes);

// endpoints here

server.get('/', (req, res) => {
  res.send('<h1>Server configured at /zoos </h1>');
});
const port = 9000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
