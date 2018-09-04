const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const zooRoutes = require('./routes/zooRoutes');
const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/zoos', zooRoutes);

server.use(errorHandler);
// endpoints here
server.get('/', (req, res) => {
  res.send('It works mon');
});

function errorHandler(err, req, res, next) {
  console.log(err);

  switch (err.code) {
    case 404:
      res.status(404).json({
        message: 'The requested file does not exist.',
      });
      break;
    case 400:
      res.status(400).json({
        message: 'There was an error regarding your input.',
      });
    default:
      res.status(500).json({
        message: 'There was an error performing the required operation',
      });
      break;
  }
}

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
