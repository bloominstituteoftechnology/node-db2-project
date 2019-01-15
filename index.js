const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');


//connection to the data base
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//POST /api/zoos
server.post('/api/zoos', async (req, res) => {
  try {
    const zoo = req.body;
    if(zoo.name.length > 0){
      const newZoo = await db.insert(zoo).into('zoos');
      res.status(200).json(newZoo);
    } else {
      res.status(404).json({message: "Please enter the name of the zoo"});
    }
  }
  catch (err) {
    res.status(500).json({message: "There was an error while trying to save a zoo to the data base"});
  }
});


//GET /api/zoos
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos  = await db('zoos');
    res.status(200).json(zoos);
  }
  catch (err) {
    res.status(500).json({message: "There was an error while trying to connect to the data base"});
  }
});

//GET /api/zoos/:id

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
