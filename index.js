const express = require('express');
const helmet = require('helmet');

const zoosRoutes = require('./zoos/zoosRoutes');

const server = express();

server.use(helmet(), express.json());

// endpoints here
server.get('/', (req, res) => {
  res.send('It works');
});

server.use('/api/zoos', zoosRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
