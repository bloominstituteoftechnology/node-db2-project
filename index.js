const server = require('./api/server.js');

// endpoints here

const port = process.env.PORT || 7575;
server.listen(port, () =>  {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
