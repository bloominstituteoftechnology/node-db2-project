const express = require('express');
const helmet = require('helmet');
const server = express();
const zooRouter = require('./routes/zooRouter');
const bearRouter = require('./routes/bearRouter');
const port = 3300;

server.use(express.json());
server.use(helmet());
server.use('/api/zoos', zooRouter);
server.use('/api/bears', bearRouter);


server.listen(port, function () {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
