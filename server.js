// DEPENDENCIES
const express = require('express');
const helmet = require('helmet');

// ROUTES
const zooRoutes = require('./zoos/zooRoutes.js');

// SERVER
const server = express();

// MIDDLEWARE
server.use(express.json());
server.use(helmet());

// ENDPOINTS
server.use('/api/zoos', zooRoutes);

// PORT
const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
