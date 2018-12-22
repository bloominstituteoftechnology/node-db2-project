const express = require('express');
const helmet = require('helmet');
const server = express();
server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  console.log('zoo info', zoo)
  db('zoo').insert(zoo)
      .then(ids => {
          res.status(201).json(ids);
      })
      .catch(err => {
          res.status(500).json({
              err: 'Failed to insert zoo'
          });
      });
});



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
