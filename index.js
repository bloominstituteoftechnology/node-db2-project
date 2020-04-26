const express = require("express");

const server = express();
const port = 8000;

server.use(express.json());

server.listen(port, () => {
  console.log(`Server initialized on port ${port}...`);
});
