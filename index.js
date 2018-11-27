const express = require('express');
const helmet = require('helmet');

const server = express();
server.use(express.json());
server.use(helmet());

const zooRoute = require('./routes/zooRoute');
const bearRoute = require('./routes/bearRoute');

server.use('/api/zoos', zooRoute);
server.use('/api/bears', bearRoute);
// endpoints here
//starter endpoint to check that it's running
server.get('', (req, res) => {
  res.status(200).json({message: 'it lives!'})
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
