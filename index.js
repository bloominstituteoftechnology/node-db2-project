const express = require('express');
const helmet = require('helmet');

const ZooRoutes = require('./zoos/zooRoutes');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// testing server
server.get('/', (req, res) => {
  res.json("Yahoo was good for Japanese Market place")
});


// // get bears
// server.get('/api/bears', async (req, res) => {
//   try {
//     db('bears')
//         res.status(200).json(bears)
//   } catch (err) {
//     res.status(500).json(err)
//   }
// })

// // create bears
// server.post('/api/bears', (req, res) => {
//   const bear = req.body;
//   db.insert(bear).into('bears')
//     .then(ids => {
//       res.status(201).json(ids)
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     })
// });

server.use('/api/zoos', ZooRoutes);

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on PORT ${port} ===\n`);
});
