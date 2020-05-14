const express = require("express");

const router = require("./carsRouter");

const server = express();

server.use(express.json());

server.use("/api/cars", router);

module.exports = server;