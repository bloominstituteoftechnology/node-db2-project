const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const server = express();

//Routers
const bearsRoutes = require("./bears/bearsRoutes");
const zoosRoutes = require("./zoos/zoosRoutes");
// endpoints here
const bears = "/api/bears";
const zoos = "/api/zoos";

server.use(express.json());
server.use(helmet());
server.use(morgan("short"));
server.use(bears, bearsRoutes);
server.use(zoos, zoosRoutes);

server.get("/", (req, res) => {
  res.send(`Started up add a end point ${bears} or  ${zoos}`);
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
