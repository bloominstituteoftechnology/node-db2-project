const express = require("express");
// const carsRouter = require("./cars/cars-router");
const server = express();

server.use(express.json());
// server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "is working" });
});

server.use("*", (req, res, next) => {
  next({ status: 404, message: "Not found" });
});

// eslint-disable-next-line
server.use((err, req, res, next) => {
  res.status(err.status || 500).json({ apimessage: err.message });
});

module.exports = server;
