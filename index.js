const express = require('express');
const helmet = require('helmet');
const zoosRoutes = require('./zoosRoutes/zoosRoutes.js')
const bearsRoutes = require('./bearsRoutes/bearsRoutes.js')
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.use('/api/zoos', zoosRoutes)
server.use('/api/bears', bearsRoutes)

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
