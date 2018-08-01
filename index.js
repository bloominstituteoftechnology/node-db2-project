const express = require('express');
const db = require('./database/db');
const zooRoutes = require('./routes/zooRoutes');
const bearRoutes = require('./routes/bearRoutes');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: 'API up and running' });
});

// endpoints here
server.use('/api/zoos', zooRoutes);
server.use('/api/bears', bearRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
