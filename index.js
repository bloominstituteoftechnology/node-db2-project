const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js')
const dbz = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here



server.get('/', (req, res) => {
  res.send('Sanity check')
});


server.get('/api/post/:id',(req,res)=> {
  dbz.
})


server.get('/api/zoos/:id', (req, res) => {
  dbz('zoo')
    .where({ id: req.params.id })
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: 'zoo not found' });
      }
    });
});





const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});