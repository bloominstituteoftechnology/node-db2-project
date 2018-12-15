const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

// Zoos
server.get('/api/zoos', (req, res)=>{
  db('zoos')
  .then(data=>{
    res.json(data);
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to retrieve data'});
  })
})

server.get('/api/zoos/:id', (req, res)=>{
  const {id} = req.params;
  db('zoos')
  .where('id', id)
  .then(data=>{
    if(data.length){
      res.json(data);
    }
    else{
      res.status(404).json({errorMessage: 'ID not found'});
    }
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to retrieve data'});
  })
})

server.post('/api/zoos', (req, res)=>{
  const zoo = req.body;
  if(zoo.name){
    db('zoos')
    .insert(zoo)
    .then(id=>{
      res.status(201).send(`${id[0]}`);
    })
    .catch(err=>{
      res.status(500).json({error: 'Failed to add data to database'});
    })
  }
  else{
    res.status(400).json({errorMessage: 'Please include the name of the zoo'});
  }
})

server.delete('/api/zoos/:id', (req, res)=>{
  const {id} = req.params;
  db('zoos')
  .where('id', id)
  .del()
  .then(count=>{
    if(count){
      res.json({message: 'Delete Successful'});
    }
    else{
      res.status(404).json({errorMessage: 'ID not found'});
    }
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to delete data'})
  })
})

server.put('/api/zoos/:id', (req, res)=>{
  const {id} = req.params;
  const body = req.body;
  db('zoos')
  .where('id', id)
  .update(body)
  .then(count=>{
    if(count){
      res.json({id: id, name: body.name});
    }
    else{
      res.status(404).json({errorMessage: 'ID not found'});
    }
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to update data'})
  })
})


// Bears
server.get('/api/bears', (req, res)=>{
  db('bears')
  .then(data=>{
    res.json(data);
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to retrieve data'});
  })
})

server.get('/api/bears/:id', (req, res)=>{
  const {id} = req.params;
  db('bears')
  .where('id', id)
  .then(data=>{
    if(data.length){
      res.json(data);
    }
    else{
      res.status(404).json({errorMessage: 'ID not found'});
    }
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to retrieve data'});
  })
})

server.post('/api/bears', (req, res)=>{
  const bear = req.body;
  if(bear.name){
    db('bears')
    .insert(bear)
    .then(id=>{
      res.status(201).send(`${id[0]}`);
    })
    .catch(err=>{
      res.status(500).json({error: 'Failed to add data to database'});
    })
  }
  else{
    res.status(400).json({errorMessage: 'Please include the name of the bear'});
  }
})

server.delete('/api/bears/:id', (req, res)=>{
  const {id} = req.params;
  db('bears')
  .where('id', id)
  .del()
  .then(count=>{
    if(count){
      res.json({message: 'Delete Successful'});
    }
    else{
      res.status(404).json({errorMessage: 'ID not found'});
    }
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to delete data'})
  })
})

server.put('/api/bears/:id', (req, res)=>{
  const {id} = req.params;
  const body = req.body;
  db('bears')
  .where('id', id)
  .update(body)
  .then(count=>{
    if(count){
      res.json({id: id, name: body.name});
    }
    else{
      res.status(404).json({errorMessage: 'ID not found'});
    }
  })
  .catch(err=>{
    res.status(500).json({error: 'Failed to update data'})
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
