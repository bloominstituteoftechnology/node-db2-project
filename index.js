const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const server = express();
const db = knex(dbConfig.development);
server.use(express.json());
server.use(helmet());

// endpoints here
const port = 3300;
server.get('/api/zoos', (req,res) => {
   db('zoos').then(zoos => {
        res.status(200).json(zoos);
   })
});

server.get('/api/zoos/:id', (req,res) => {
  const {id} = req.params;
  db('zoos').where('id', id)
            .then(zoo => {
               res.status(200).json(zoo);
           }).catch(err => {
                res.status(500).json({err: 'Failed to find crayon'});
              })
});
server.post('/api/zoos', (req, res) => {
    const name = req.body;
  if(name) {  
      db('zoos').insert(name)
                .then( response => {
                    console.log(response);
                    res.status(201).json(response)
                })
                .catch(err => {
                    res.status(500).json({err:'Something went wrong with our server..please try again.'})
                })
    } else {
          res.status(400).json({err: 'Please enter the name'});
    }        
});
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
