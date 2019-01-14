const express = require('express');
const helmet = require('helmet');
const server = express();
const configMiddleware =require('./middleware/middleware')

server.use(express.json());
server.use(helmet());
configMiddleware(server);

// endpoints here
server.get('/', (req, res) => {
  res.json({ api: 'Server is Alive!'})
})


module.exports = server;