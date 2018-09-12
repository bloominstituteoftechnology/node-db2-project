const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());


const dbConfig = require('./knexfile.js');

const db = knex(dbConfig.development);


server.get('/', (req, res) => {
  res.send('API Running...');
});

// endpoints here

server.get('/api/zoos', (req, res) => {

  db('zoos')
    .then(zoo => {
      res.status(200).json(zoo)})
    .catch(fail => {
      console.log('fail', fail)
      res.status(500).json({message: 'Error getting the zoos'});
  });
  })


  server.get(`/api/zoos/:id`, (req,res) => {
  

    db('zoos').where({ id:req.params.id })
        .then((id) => {
            res.json(id);
        })
        .catch((fail) => {
            console.log(fail);
            res.status(404).json({message: "The zoo with the specified ID does not exist."});
        })

    .catch((fail) => {
        console.log(fail)
        res.status(500).json({error: "The zoo's information could not be retrieved."});
    })
})





  server.post('/api/zoos', (req, res) => {
    const zoo = req.body;


    db('zoos').insert(zoo)
        .then((ids)=> { 
          res.status(201).json(ids);
        })
                .catch((fail) => {
                    console.log(fail);
                    res.status(500).json({ error: "There was an error while saving the zoo to the database." });
                });
        })



server.put(`/api/zoos/:id`, (req, res) => {

  db('zoos').where({ id:req.params.id } ).update(req.body)
  .then((zoo) => {
      res.status(201).json(zoo);
  })
  .catch((fail) => {
      console.log(fail);
      res.status(404).json({ message: "The zoo with the specified ID does not exist."});
  });


})


server.delete('/api/zoos/:id', (req, res) => {

      db('zoos').where({ id:req.params.id }).delete()
          .then((zoo) => {
              res.status(201).json(zoo);
          })
          .catch((fail) => {
              console.log(fail);
              res.status(404).json({ message: "The zoo with the specified ID didn't delete."});
          });

      
});





const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
