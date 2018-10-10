const express = require('express');

const cors = require('cors');

const helmet = require('helmet');

const logger = require('morgan');

const zoosRoutes = require('./zoos/zoosRoutes');

// const zoos = require('./data/lambda.sqlite3');

const server = express();


////// ++++++++MIDDLEWARE +++++++//////////

server.use(
  express.json(),
  cors(),
  logger(":method :url :status :response-time ms"),
  helmet()
  );


////////////+++zoo Routes++++/////////////////////////////

server.get('/', (req, res) => {
  res.send("Heyo");
});

server.use('/api/zoos', zoosRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
