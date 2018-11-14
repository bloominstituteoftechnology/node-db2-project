

//== Zoo Database API Server ===================================================

//-- Dependencies --------------------------------
const express  = require('express'          );
const helmet   = require('helmet'           );
const api      = require('./api-maker'      );
const database = require('./database-access');

//-- Constants -----------------------------------
const PORT = 3300;
const MESSAGE_SERVER_START = `\n=== Web API Listening on http://localhost:${PORT} ===\n`;
const TABLE_ZOOS  = 'zoos' ;
const TABLE_BEARS = 'bears';
const PATH_ZOOS  = '/api/zoos' ;
const PATH_BEARS = '/api/bears';

//-- Create Server and open Port -----------------
const server = express();
server.listen(PORT, function() {
  console.log(MESSAGE_SERVER_START);
});

//-- Configure Server ----------------------------
server.use(express.json());
server.use(helmet()      );
server.use(PATH_ZOOS , api(database(TABLE_ZOOS )));
server.use(PATH_BEARS, api(database(TABLE_BEARS)));
