const express = require('express');
const helmet = require('helmet');
const server = express();
const zooserver = require('./routes/zooserver');
const bearserver = require('./routes/bearserver');
const port = 3300;

server.use(express.json());
server.use(helmet());
server.use('/api/zoos', zooserver);
server.use('/api/bears', bearserver);


server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
