const express = require('express');
const helmet = require('helmet');
const BearsRoutes = require('./api/Bears/bearsroutes');
const ZoosRoutes = require('./api/Zoos/zoosroutes');

const server = express();
server.use(express.json());
server.use(helmet());

// endpoints here
server.use('/api/bears', BearsRoutes);
server.use('/api/zoos', ZoosRoutes);

server.use((req, res) => {
  res.status(404).json({"error": `The path '${req.url}' doesn't exist.`});
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
