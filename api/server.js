const express = require('express');
const helmet = require('helmet');

const rolesRouter = require('../zoos/zoos-router.js/index.js.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoos', rolesRouter);

module.exports = server;
