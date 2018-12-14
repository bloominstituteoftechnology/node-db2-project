const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here


const PORT = 4444;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});
