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

server.get('/api/zoos', (req, res) => {
  db('zoos')
    // .select('name')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json({ errorMessage: 'The zoos information could not be retrieved.' }));
})

server.post('/api/zoos', (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into('zoos')
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => res.status(500).json({ errorMessage: 'There was an error while saving the post to the database' }));
});

server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where('id', '=', id)
    .update(changes)
    .then(count => {
      res.status(200).json({ message: `Update succesful. ${count} record updated.` })
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Update failed.'})
    });
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  
  db('zoos')
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} record(s) deleted.`})
    })
    .catch(err => {
      res.status(500).json({ errorMessage: 'Oops! There was an error when trying to delete the record.' })
    });
}); 

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
