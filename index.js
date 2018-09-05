const express = require("express");
const server = express();

// middleware
const configureMiddleware = require("./middleware/middleware.js");
configureMiddleware(server);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
