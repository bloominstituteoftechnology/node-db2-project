const express = require('express');
const server=express();
const configMiddleware=require('./config/middleware')(server);
const zoos=require('./zoos/userRoutes.js');
const bears=require('./bears/userRoutes.js');

server.use('/api/zoos',zoos);
server.use('/api/bears',bears);
// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
