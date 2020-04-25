const express = require("express");
const helmet = require("helmet");

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(express.json());