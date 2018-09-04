const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());





function projectCheckName(req, res, next){
  let body = req.body

  if(body.name.length !== 0) {
      next(); 
  } else {
      res.status(500).json({error: "Property of 'name' must exist wtih a value."})
      }
}



server.post('/api/zoos', projectCheckName, (req, res) => {
  const zoo = req.body; 
  db.insert(zoo).into('zoos')
  .then(id => {
      res.status(201).json(id); 
  })
  .catch(err => 
      res.status(500).json({error: "The zoo could not be posted."}));
});


server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
      res.status(201).json(zoos); 
  })
  .catch(err => 
      res.status(500).json({error: "The zoos could not be retrieved."}));
})


server.get('/api/zoos/:id', (req, res) => {
  const id = req.params.id;  
  db('zoos')
  .where('id', id)
  .then(zoos => {
      res.status(201).json(zoos);
  })
  .catch(err => 
      res.status(500).json({error: "Zoo by that ID could not be retrieved."}));
})

server.delete('/api/zoos/:id', (req, res) => {
  const id = req.params.id; 
  db('zoos')
  .where('id', id)
  .del()
  .then(zoos => {
      res.status(201).json(zoos);
  })
  .catch(err => 
      res.status(500).json({error: "Zoo by that ID could not be deleted."}));
})

server.put('/api/zoos/:id', (req, res) => {
  const [id, body] = [req.params.id, req.body]; 
  db('zoos')
  .where('id', id)
  .update('name', body.name)
  .then(zoos => {
      res.status(201).json(zoos);
  })
  .catch(err => 
      res.status(500).json({error: "Zoo by that ID could not be updated."}));
})


//========== CRUDDY BEARS ==============================


server.post('/api/bears', projectCheckName, (req, res) => {
  const bear = req.body; 
  db.insert(bear).into('bears')
  .then(id => {
      res.status(201).json(id); 
  })
  .catch(err => 
      res.status(500).json({error: "The bear could not be posted."}));
});

server.get('/api/bears', projectCheckName, (req, res) => {
  db('bears')
  .then(bears => {
      res.status(201).json(bears); 
  })
  .catch(err => 
      res.status(500).json({error: "The bears could not be retrieved."}));
})


server.get('/api/bears/:id', (req, res) => {
  const id = req.params.id;  
  db('bears')
  .where('id', id)
  .then(bears => {
      res.status(201).json(bears);
  })
  .catch(err => 
      res.status(500).json({error: "Bear by that ID could not be retrieved."}));
})

server.delete('/api/bears/:id', (req, res) => {
  const id = req.params.id; 
  db('bears')
  .where('id', id)
  .del()
  .then(bears => {
      res.status(201).json(bears);
  })
  .catch(err => 
      res.status(500).json({error: "Bear by that ID could not be deleted."}));
})

server.put('/api/bears/:id', (req, res) => {
  const [id, body] = [req.params.id, req.body]; 
  db('bears')
  .where('id', id)
  .update('name', body.name)
  .then(bears => {
      res.status(201).json(bears);
  })
  .catch(err => 
      res.status(500).json({error: "Bear by that ID could not be updated."}));
})




const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
