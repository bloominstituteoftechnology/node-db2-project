const express = require('express');
const helmet = require('helmet');

const zooRoute = require('./zooRoutes/zooRoute');

const server = express();

server.use(helmet());
server.use(express.json());

// endpoints here
server.get('/', (req, res) => {
  res.send("It's alive")
});

server.use('/api/zoos', zooRoute);

const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
