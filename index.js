const express = require('express');
const helmet = require('helmet');

const zoosRoutes = require('./zoos/zoosRoutes.js');

const server = express();

server.use(helmet());
server.use(express.json());

// sanity check
server.get('/', (req, res) => {
  res.send("Yup... it works.");
});

server.use('/api/zoos', zoosRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
