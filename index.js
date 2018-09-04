const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const zooRoutes = require('./zoos/zooRoutes');
const bearRoutes = require('./bears/bearsRoutes');

server.use('/api/zoos', zooRoutes);
server.use('/api/bears', bearRoutes);

server.get('/', (req, res) => {
  res.send('API Running...');
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
