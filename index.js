const express = require('express');
const knex = require('knex');

const helmet = require('helmet');

const dbConfig = require('./knexfile');
const server = express();
const db = knex(dbConfig.development);


server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoos', (req, res) => {
  const animal = req.body;
  console.log(`hi from line 18`)
  db('zoos').insert(animal)
  .then(ids => { 
      console.log(`hi from line 21`)
    res.status(201).json(ids);
   
  })
  .catch(err => {
    res.status(500).json({err: 'Failed to insert animal'});
  });
});  


server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(rows => {
      res.json(rows)
  })
  .catch(err => {
      res.status(404)
      res.json(`Couldn't find any animals`)
  })
});

server.get('/api/zoos/:id', (req, res) => {
  const {id} = req.params.id;
  db('zoos').where('id', id)
  .then(rows => {
    res.json(rows)
  }).catch(err => {
    res.status(404)
    res.json(`Couldn't find that specific animal`)
  })
})

// server.post('/api/zoos', (req, res) => {
//   const animal = req.body;
//   console.log(`hi from my post function on line 40`)
//   db('zoos').insert(animal)
//   .then(ids => { 
//       console.log(`hi from line 43`)
//     res.status(201).json(ids);
   
//   })
//   .catch(err => {
//     res.status(500).json({err: 'Failed to insert animal'});
//   });
// });  

const port = 8080;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
