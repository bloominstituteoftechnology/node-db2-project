const express = require('express');
const zooRoutes = require('./zoos/zooRoutes.js');
const bearRoutes = require('./bears/bearRoutes.js');

const server = express();

server.get('/', (req, res) => {
  res.send('API running...')
});

server.use('/api/zoos', zooRoutes);
server.use('/api/bears', bearRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
