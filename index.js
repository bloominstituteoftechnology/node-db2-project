const express = require("express");
const welcomeRouter = require("./Welcome/welcome-router");

const server = express();
const port = 8000;

server.use(express.json());

server.use("/", welcomeRouter);

server.listen(port, () => {
  console.log(`Server initialized on port ${port}...`);
});
