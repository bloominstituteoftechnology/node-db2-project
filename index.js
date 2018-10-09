const express = require('express');
const applyGlobalMiddleware = require('./config/middleware/global.js');
const { bearRoutes ,zooRoutes } = require('./routes');

const server = express();

// apply global middleware
applyGlobalMiddleware(server);

// endpoints
server.use('/api/bears', bearRoutes);
server.use('/api/zoos', zooRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
