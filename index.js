const express = require("express");
const helmet = require("helmet");
const zooRoutes = require('./zooRoutes');
const bearRoutes = require('./bearRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zooRoutes);
server.use('/api/bears', bearRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
