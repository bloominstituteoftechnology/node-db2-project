const   express = require('express'),
        Middleware = require('./MIddleware/Middleware'),
        port = 3312,
        server = express();



// import middleware  and call 
Middleware(server);


server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
