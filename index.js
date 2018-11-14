

//== Zoo Database API Server ===================================================

//-- Dependencies --------------------------------
const express = require('express'     );
const helmet  = require('helmet'      );
const apiZoo  = require('./apiZoo.js' );
const apiBear = require('./apiBear.js');

//-- Constants -----------------------------------
const PORT = 3300;
const MESSAGE_SERVER_START = `\n=== Web API Listening on http://localhost:${PORT} ===\n`;

//-- Create Server and open Port -----------------
const server = express();
server.listen(PORT, function() {
  console.log(MESSAGE_SERVER_START);
});

//-- Configure Server ----------------------------
server.use(express.json());
server.use(helmet()      );
server.use('/api/zoos' , apiZoo );
server.use('/api/bears', apiBear);
