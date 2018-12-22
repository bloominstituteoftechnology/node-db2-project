const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');


const port = 3300;
const server = express();
const zoos = require('./Routers/zoos_router.js');
const bears = require('./Routers/bears_router');

server.use(express.json());
server.use(helmet());
server.use(logger('dev'));
server.use('/', zoos);
server.use('/', bears);

server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
