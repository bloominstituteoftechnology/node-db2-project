const express = require('express');
const applyGlobalMiddleware = require('./config/middleware/global.js');
const zooRoutes = require('./routes/zoos/index.js');

const server = express();

// apply global middleware
applyGlobalMiddleware(server);

// endpoints
server.use('/api/zoos', zooRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
