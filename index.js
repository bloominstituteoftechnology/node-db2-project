const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db=knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', (req, res) => { 
   db('zoos')
   .then(zoos => res.status(201).json(zoos))
   .catch(err => res.status(500).json({ 
     error: 'data not retrievable at this time'}));
});

server.get('/api/zoos/:id', (req, res) => {
   db('zoos')
   .WHERE({id: req.params.id })
   .then(zoos => {
       if(zoos) {
           res.status(200).json(zoos);
       } else {
           res.status(404).json({
             error: 'Not Found'});
       }
   })
   .catch(error => res.status(500).json({ 
     error: 'data not retrievable at this time'}));
});

server.post('/api/zoos',(req, res) => {
  const { zoo } = req.body;

  if (!zoo ) {
    res.status(400).json({ error: 
    'Please provide a name for this zoo' })
  }
    db.insert({ zoo })
    .into('zoos')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => 
      res.status(500).json({ error: 'Not Saved' }));
});


server.put('/api/zoos/:id', (req, res) => {
  const {zoo} = req.body;

  db('zoos')
    .WHERE({id: req.params.id })
    .update({zoo})
    .then(zoo => 
      res.status(200).json([zoos]))
    .catch(err => 
      res.status(500).json({ error: 'Not Updated' }));
});


server.delete('/api/zoos/:id', (req, res) => {
  db('zoos')
    .WHERE({id: req.params.id})
    .delete()
    .then(zoos => {
      if (zoos) {
        res.status(200).json({
          message: 'succesfully deleted'})
      } else {
        res.status(404).json({ 
          errMsg: `not found` });
      }
    })
    .catch(err => res.status(500).json({ 
      error: 'could not be deleted' }));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
