const express = require('express');
const db = require('./dbConfig');

const server = express();

server.use(express.json());

module.exports = server;