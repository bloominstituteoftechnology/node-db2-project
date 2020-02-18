require('dotenv').config();
  const server = require('./api/server'); // <-- Where the magic happens 🧙🏾‍♂️
  const PORT = process.env.PORT || 9999
  server.listen(PORT, console.log(`\n*** Server listening on ${PORT} ***\n`));

  const express = require('express');
  const apiRouter = require('./api-router');
  const configureMiddleware = require('./configure-middleware'); 

  const server = express();

  configureMiddleware(server);

  server.use('/api', apiRouter); // after the api endpoint is reached, activate "apiRouter"
  module.exports = server;