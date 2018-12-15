const express = require('express');
const helmet = require('helmet');
const zooRouter = require('./routers/zooRouter');

const server = express();

server.use(express.json(), helmet());

server.use('/api/zoos', zooRouter);

server.get('/', (req, res) => {
  res.send('API is Active');
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
