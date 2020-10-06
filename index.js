const express = require("express");
const helmet = require("helmet");
const server = express();
const carRouter = require("./Routers/carRouter");

server.use(helmet());
server.use(express.json());
server.use("/cars", carRouter);

server.get("/", (req, res) => {
  res.status(200).json({ Data: "WORK" });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`API running on ${port}`);
});
