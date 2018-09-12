const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const dbConfig = require('./knexfile');

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send('API Running...');
});

// endpoints here

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ errMsg: 'Database could not retrieve info' })
    });
})

server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  db('zoos')
      .get(id)
      .then(zoos => {
          if (zoos) {
              res.status(200).json(zoos);
          } else {
              res.status(404).json({ errMsg: `The zoo with the id:${id} is not found` });
          }
      })
      .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

server.post('/api/zoos', (req, res) => {
  const name = req.body;

  if (!name) res.status(400).json({ errMsg: 'Please provide a name' });

  db('zoos')
      .insert(name)
      .into('zoos')
      .then(id => {
        res.status(201).json(id)
      })
      .catch(err => res.status(500).json({ errMsg: 'Database could not retrieve info' }));
});

server.put(`/api/zoos/:id`, (req, res) => {
  db('zoos')
    .where({ id:req.params.id } )
    .update(req.body)
    .then((zoo) => {
      res.status(201).json(zoo);
    })
    .catch((fail) => {
      console.log(fail);
      res.status(404).json({ message: "The zoo with the specified ID does not exist."});
  });
})

  server.delete('/api/zoos/:id', (req, res) => {
    db('zoos')
      .where({ id:req.params.id })
      .delete()
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
