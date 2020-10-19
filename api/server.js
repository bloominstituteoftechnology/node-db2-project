const express = require("express");
const db = require("../data/config");
const server = express();
server.use(express.json());
module.exports = server;