const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post('/api/zoo', (req,res)=>{
  const zoo = req.body;
  db('zoos').insert(zoo)
  .then(ids =>{
    res.status(201).json(ids);
  })
  .catch(err=>{
    res.status(500).json({err: 'Failed to insert zoo animal'})
  })
});

server.get('/api/zoo', (req,res)=>{
  db('zoos').then(row =>{
    console.log(row)
    res.json(row);
  }).catch(err =>{
    res.status(500).json({err: 'failed to find zoo animals'})
  })
});


server.get('/api/zoo/:id', (req,res)=>{
  const {id} = req.params;
  db('zoos').where('id',id)
  .then(rows =>{
    console.log(rows)
    res.json(rows);
  }).catch(err=>{
    res.status(500).json({ err: 'Failed to find zoo animal'})
  });
});


server.put('/api/zoo/:id', (req,res) =>{
  const {id} = req.params;
  const name = req.body;

  db('zoos').where('id',id).update(name)
  .then(rowCount =>{
    res.status(200).json(row)
  })
  .catch(err =>{
    res.status(500).json({err: 'Failed to update zoo'})
  });
});


server.delete('/api/zoo/:id', (req, res)=>{
  const {id} = req.params;
  db('zoos').where('id',id).del()
  .then(row =>{
    res.status(200).json(row)
  })
  .catch(err=>{
    res.status(500).json({err: 'Failed to delete animal'})
  });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
