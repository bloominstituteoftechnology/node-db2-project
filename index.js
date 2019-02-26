const express = require('express');
const helmet = require('helmet');


const server = express();

server.use(express.json());
server.use(helmet());


// endpoints here

const softserver = require ('./widget');

server.use(softserver);

// - sanity -

server.get('/', (req, res) => {
  res.send (`
    <h1>Heyo, Captain Jack</h1>
  `)
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
