const express = require('express');
const helmet = require('helmet');

const apiRoute = require('./api');

const server = express();
server.use(express.json());
server.use(helmet());

server.use('/api', apiRoute);



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
