const express = require("express");

const carsRouter = require("./routers/carsRouter");

const server = express();

server.use(express.json());

const port = process.env.PORT || 5001;

server.use("/api/cars", carsRouter);

server.listen(port, () => {
  console.log("Server is running!");
});
