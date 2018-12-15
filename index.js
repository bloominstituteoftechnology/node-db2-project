const express = require('express');
const helmet = require('helmet');
const db = require('./data/model');

// const knex = require('knex');
// const knexConfig = require('./knexfile');
// const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/', (req, res) => {
  db.get()
    .then(zoos => {
      res.json(zoos)
    })
    .catch(err => {
      res.status(500).json({ message: "Could not fetch Zoos" })
    })
});


server.get('/:id', (req, res) => {
  const {id} = req.params;
  db.get(id)
    .then(zoo => {
      if(Object.keys(zoo).length === 0){
        res.status(404).json({ message: "Invalid Zoo ID" })
      } else {
        res.json(zoo)
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not find that Zoo" })
    })
});

server.post('/', (req, res) => {
  const zoo = req.body;
  //Add check for existing Zoo name, throw error if duplicate
  if(zoo.name){
    db.insert(zoo)
      .then(newZoo => {
        res.json(newZoo)
      })
      .catch(err => {
        res.status(500).json({ message: "Unable to add this new zoo" })
      })
  } else{
    res.status(400).json({ message: "New zoos require a name" })
  }
})

// server.post(('/', (req, res) => {
//   const zoo = req.body;
//   console.log('zoo:', zoo);

//   if(zoo.name){
//     console.log('if', zoo.name);
//     //check if name already exists
//     //if so, return no duplicates allowed
//     //if not, insert
//     db.nameCheck(zoo.name)
//       .then(zoo => {
//         console.log('name check then:', zoo)
//         if(Object.keys(zoo).length === 0){
//           db.insert(zoo)
//             .then(response => {
//               console.log('insert response', response);
//               res.json(response)
//             })
//             .catch(err => {
//               console.log('insert err', err);
//               res.status(500).json({ message: "Unable to add Zoo" })
//             })
//         } else {
//           console.log('zoo exists')
//           res.status(400).json({ message: "That Zoo already exists. New Zoos cannot have the same name as an existing Zoo" })
//         }
//       })
//   } else {
//     console.log('no name')
//     res.status(400).json({ message: "New Zoos require a name" })
//   }
// }))


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
