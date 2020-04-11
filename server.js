const express = require('express');
const helmet = require('helmet');

const carRouter = require("./cars/cars_router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use ("/", carRouter);

module.exports= server;