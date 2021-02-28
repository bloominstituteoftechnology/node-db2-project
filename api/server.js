const express = require("express");
const helmet = require("helmet");
const carRouter = require("./cars/carsRouter");
const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/cars", carRouter);

server.get("/", (req, res) => {
  res.json({ message: "Server up" });
});

module.exports = server;