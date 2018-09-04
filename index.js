const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const middleware = require("./middleware");
const zooRoutes = require("./Routes/zooRoutes");
const bearRoutes = require("./Routes/bearRoutes");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));

server.use("/api/zoos", zooRoutes);
server.use("/api/bears", bearRoutes);
server.use(middleware);

// endpoints here

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
