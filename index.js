const express = require('express');
const helmet = require('helmet');
const zoosRoutes = require('./data/zoos');
const bearsRoutes = require('./data/bears');
const server = express();

server.use(express.json());
server.use(helmet());
server.use('/api/zoos', zoosRoutes);
server.use('/api/bears', bearsRoutes);

server.get('/', (req, res) => {
  res.send('API is running...')
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
