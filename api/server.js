const express = require('express');
const helmet = require('helmet');

const rolesRouter = require('../roles/roles-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/roles', rolesRouter);

module.exports = server;