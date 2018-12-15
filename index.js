//create express server 
const express = require('express');
const server = express();


//Built in and 3rd party middleware
server.use(express.json());
const helmet = require('helmet');
server.use(helmet());

//Grab route handlers/endpoints
const zoosRoutes = require('./routers/zoosRouter')
server.use('/api/zoos', zoosRoutes);
const bearsRoutes = require('./routers/bearsRouter')
server.use('/api/bears', bearsRoutes);

//Listener
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
