const express = require("express");
const server = express();
const port = 4000;
const carRoute = require("./carRoute");

server.use(express.json());
server.use("/cars", carRoute);
server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

module.exports = server;
