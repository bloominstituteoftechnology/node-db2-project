const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const zoosRoutes = require('./zoos/zoosRoutes.js');
const bearsRoutes = require('./bears/bearsRoutes.js');

const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(helmet());
server.use(express.json());

// endpoints here
////////////////
// ZOOS
////////////////
server.use('/api/zoos', zoosRoutes);

////////////////
// BEARS
////////////////
server.use('/api/bears', bearsRoutes);
// server.get('/api/bears', (req, res) => {
//   db('bears')
//     .then((bears) => {
//       res.status(200).json(bears);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// server.get('/api/bears/:id', (req, res) => {
//   const { id } = req.params;
//   db('bears')
//     .where({ id })
//     .first()
//     .then((bear) => {
//       if (!bear) {
//         return res.status(404).send({
//           message: `The bear with the specified ID ${id} does not exist.`,
//         });
//       }
//       res.status(200).json(bear);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// server.post('/api/bears', (req, res) => {
//   const { name } = req.body;
//   const bear = { name };
//   if (!name) {
//     return res.status(400).send({
//       errorMessage: 'Please provide a name for the bear.',
//     });
//   }
//   db.insert(bear)
//     .into('bears')
//     .then((ids) => {
//       res.status(201).json(ids);
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// server.put('/api/bears/:id', (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;
//   const newbear = { name };
//   if (!name) {
//     return res.status(400).send({
//       errorMessage: 'Please provide a name for the bear.',
//     });
//   }
//   db('bears')
//     .where({ id })
//     .update(newbear)
//     .then((count) => {
//       if (!count) {
//         res.status(404).json({
//           message: 'No bear found to update',
//         });
//       }
//       res.status(200).json({ message: `${count} record updated` });
//     });
// });

// server.delete('/api/bears/:id', (req, res) => {
//   const { id } = req.params;
//   db('bears')
//     .where({ id })
//     .del()
//     .then((remove) => {
//       if (!remove) {
//         return res.status(404).send({
//           message: `The bear with the specified ID ${id} does not exist.`,
//         });
//       }
//       res.status(200).send({ message: `bear with ID ${id} was removed.` });
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
