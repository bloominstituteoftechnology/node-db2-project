const express = require("express");
const helmet = require("helmet");

const carsRouter = require("./car-router");

const server = express();

server.use(helmet());
server.use(express.json());

server.use("/cars", carsRouter);

module.exports = server;
