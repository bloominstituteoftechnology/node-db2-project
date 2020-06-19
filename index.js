const express = require("express");
const carsRouter = require("./cars/cars-router");

const server = express();
const port = process.env.PORT || 8000;

server.use(express.json());

// server.use("/", carsRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "THERE IS AN ERROR",
  });
});

server.listen(port, () => {
  console.log("API IS LIVE ${port}");
});
