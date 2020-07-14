const express = require("express");

const server = express();

const carsRouter = require("./carsRouter");

server.use(express.json());

server.use("/api/cars", carsRouter);

module.exports = server;
