const express = require('express');
const helmet = require('helmet');
const zooRouter = require('./zooRoutes');
//************************************************
//*  DB set up if endpoints were in index.js    **
//*---------------------------------------------**
//*  const dbConfig = require('./knexfile');    **
//*                                             **
//*  const knex = require('knex');              **
//*  const db = knex(dbConfig.development);     **
//************************************************

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/', (req, res) => {
  res.send('It is working!');
});

server.use('/api/zoos', zooRouter);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

// Enpoints without using routes

// server.get('/api/zoos', (req, res) => {
//   db('zoos').then(zoos => {
//     res.json(zoos);
//   });
// });

// server.get('/api/zoos/:id', (req, res) => {
//   const { id } = req.params;
//   db('zoos')
//     .where({ id })
//     .first()
//     .then(zoo => {
//       if (zoo) {
//         res.json(zoo);
//       } else {
//         res.status(404).json({ error: `Zoo with the id of ${id} not found.` });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// server.post('/api/zoos', (req, res) => {
//   const zoo = req.body;
//   db('zoos')
//     .insert(zoo)
//     .then(ids => {
//       res.status(201).json(ids);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

// server.put('/api/zoos/:id', (req, res) => {
//   const { id } = req.params;
//   const changes = req.body;

//   db('zoos')
//     .where({ id })
//     .update(changes)
//     .then(count => {
//       if (count) {
//         res.status(201).json(count);
//       } else {
//         res
//           .status(404)
//           .json({ error: `zoo with the id of ${id} could not be found.` });
//       }
//     })
//     .catch(err => res.status(500).json(err));
// });

// server.delete('/api/zoos/:id', (req, res) => {
//   const { id } = req.params;
//   db('zoos')
//     .where({ id })
//     .del()
//     .then(count => {
//       if (count) {
//         res.json(count);
//       } else {
//         res.status(404).json({ error: 'Zoo could not be found.' });
//       }
//     })
//     .catch(err => res.status(500).json(err));
// });
