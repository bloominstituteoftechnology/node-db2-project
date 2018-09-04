const express = require('express');
const helmet = require('helmet');

const ZooRoutes = require('./zoos/ZooRoutes');
const bearRoutes = require('./bear/bearRoutes');

const server = express();

server.use(express.json());
server.use(helmet());


server.get('/', (req, res) => {
  res.send('hello');
});


server.use('/api/zoos', ZooRoutes);
server.use('/api/bear', bearRoutes);


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
