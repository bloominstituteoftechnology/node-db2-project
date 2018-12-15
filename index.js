//create express server 
const express = require('express');
const server = express();

//Create db / knex connection
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

//Built in and 3rd party middleware
server.use(express.json());
const helmet = require('helmet');
server.use(helmet());

//custom middleware
const verify = require('./middleware')

// endpoints here

//SELECT - GET
server.get('/api/zoos', (req, res) =>{
    db('zoos')
    .then(zoos =>{
      res.status(200).json(zoos)
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to retrieve zoos"})
    })

});

//SELECT W/WHERE - GET BY ID
server.get('/api/zoos/:id', (req, res) =>{
    const id = req.params.id;

    db('zoos')
    .where('id', id)
    .then(zoo =>{
      if(zoo){
        res.status(200).json(zoo);
      }else{
        res.status(404).json({error: "The specified zoo does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to retrieve specified zoo"})
    })
});

//INSERT - POST
server.post('/api/zoos', verify.checkName, (req, res) =>{ 
    const newZoo = req.body;

    db('zoos')
    .insert(newZoo)
    .then(id =>{
      res.status(201)
      res.json(id)
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to add new zoo"})
    })
});

//UPDATE - PUT
server.put('/api/zoos/:id', verify.checkName, (req, res) =>{
    const id = req.params.id;
    const updatedZoo = req.body;

    db('zoos')
    .where('id', id)
    .update(updatedZoo)
    .then(count =>{
      if(count){
        res.status(200).json(count)
      }else{
        res.status(404).json({error: "The specified zoo id does not exist"})
      }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to update the specified zoo"})
    })
});

//DELETE 
server.delete('/api/zoos/:id', (req, res) =>{
  const id = req.params.id;

  db('zoos')
  .where('id', id)
  .del()
  .then(count =>{
    if(count){
      res.status(200).json(count)
    }else{
      res.status(404).json({error: "The specified zoo id does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({error: "Unable to delete specified zoo"})
  })
});

//Listener
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
