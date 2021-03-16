const express = require("express");
const helmet = require("helmet");
const carRouter = require("./cars/carsRouter");
const server = express();

server.use(helmet());
server.use(express.json());

server.use("/api/car", carRouter);

server.get("/", (req, res) => {
  res.json({ message: "Server connected" });
});

module.exports = server;
