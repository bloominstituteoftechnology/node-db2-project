const express = require('express');
const knex = require('knex');
// const helmet = require('helmet');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const nameCheck = require('../middleware/nameCheck.js')


const server = express();
server.use(express.json());
// server.use(helmet());

// TABLE SCHEMA
// id: integer, primary key, autoincrements
// name: text, required, unique

// endpoints here

// ZOOS
// POST: .insert() .into
server.post('/api/zoos', nameCheck, (req, res) => {
  const zoo = req.body;

  db('zoos')
    .insert(zoo)
    // .returning('*') // other databases allow other items to be returned
    .then(ids => {
      res.status(201).json({ id: ids[0]});
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err })
    })
})

// GET (assumes .select())
server.get('/api/zoos', (req, res) => {

  db('zoos')
  //.select()
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ err }));
});

// GET BY ID
server.get('/api/zoos/:id', (req, res) => {

  db('zoos')
    .then(zoos => res.status(200).json(zoos[0]))
    .catch(err => res.status(500).json({ err }));
});

// PUT .where() .update()
server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('zoos')
    .where({ id: id }) // 
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// DELETE .where() .del()
// Calling .del() without first filtering the records will result on the removal of all the records in the table, be careful!

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// BEARS
// POST: .insert() .into
server.post('/api/bears', nameCheck, (req, res) => {
  const bear = req.body;

  db('bears')
    .insert(bear)
    // .returning('id')
    .then(ids => {
      res.status(201).json({ id: ids[0]});
    })
    .catch(err => {
      res.status(500).json({ message: 'Error inserting', err })
    })
})

// GET 
server.get('/api/bears', (req, res) => {

  db('bears')
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json({ err }));
});

// GET BY ID
server.get('/api/bears/:id', (req, res) => {

  db('bears')
    .then(bears => res.status(200).json(bears[0]))
    .catch(err => res.status(500).json({ err }));
});

// PUT .where() .update()
server.put('/api/bears/:id', (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db('bears')
    .where({ id: id }) // 
    .update(changes)
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});

// DELETE .where() .del()
// Calling .del() without first filtering the records will result on the removal of all the records in the table, be careful!

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params;

  db('bears')
    .where({ id: id })
    .del()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json(err));
});


// JOIN
server.get('/api/zoos', (req, res) => {
  return db('zoos')
    .join('bears', 'zoos.name', '=', 'bears.zoo')
    // .select('zoos.name', 'bears.name', 'zoos.bear')
    .select('*')
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => res.status(500).json(err));
})


server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
