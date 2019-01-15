const express = require("express");
const helmet = require("helmet");

const zoosRoutes = require("./zoos/zoosRoutes");

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/", async (req, res) => {
  res.send("Sanity Check: Everything is working");
});

server.use("/zoos", zoosRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
