const express = require('express');
const helmet = require('helmet');

const routes = require('./routes/ZooRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send("Server Check");
});

// endpoints here
server.use('/api/zoos', routes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
