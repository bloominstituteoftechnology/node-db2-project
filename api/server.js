const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();
const router= require('../api/carsRouter')

server.use(express.json());
server.use(router)

module.exports = server;