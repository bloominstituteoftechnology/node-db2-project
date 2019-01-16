const express = require('express');
const helmet = require('helmet');

const zooRoutes = require('./routers/zooRoutes.js');
const bearRoutes = require('./routers/bearRoutes.js')


const server = express();
const port = 3300;

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zooRoutes);
server.use('/api/bears', bearRoutes);



server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

