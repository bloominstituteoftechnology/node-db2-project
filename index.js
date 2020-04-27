const express = require("express");
const welcomeRouter = require("./Welcome/welcome-router");
const carsRouter = require("./Cars/cars-router");

const server = express();
const port = 8000;

server.use(express.json());

server.use("/", welcomeRouter);
server.use("/cars", carsRouter);

server.listen(port, () => {
  console.log(`Server initialized on port ${port}...`);
});
