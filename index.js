const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('It is working!');
});

server.get('/api/zoos', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

// server.get('/api/zoos/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     const zoo = await db('zoos')
//       .where({ id })
//       .first();

//     if (zoo) {
//       res.status(200).json(zoo);
//     } else {
//       res.status(404).json({ message: 'zoo not found' });
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
//  });

server.get('/api/zoos/:id', (req,res) => {
  const id = req.params.id;
  db('zoos').where({id})
    .then(zoo=>{
      if (zoo){
        res.status(200).json(zoo[0]);
      } else {
        res.status(404).json({ message: 'zoo not found'});
      }
    })
    .catch(err=>res.status(500).json(err));
})

server.post('/api/zoos', (req, res) => {
  // grab data from body
  const zoo = req.body;

  // save data to database
  db.insert(zoo)
    .into('zoos')
    .then(id => {
      // return id of mewly created record
      res.status(201).json(id);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.put('/api/zoos/:id', (req, res) => {
  const { id } = req.params;
  const newZoo = req.body;

  db('zoos')
    .where({ id })
    .update(newZoo)
    .then(zoo => {
      if (!zoo || zoo < 1) {
        res.status(404).json({ message: 'No records found to update'});
      } else {
        res.status(200).json(zoo);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params;

  db('zoos')
    .where({ id })
    .del()
    .then(zoo => {
      if (!zoo || zoo < 1) {
        res.status(404).json({ message: 'No records found to delete' });
      } else {
        res.status(200).json(zoo);
      }
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});