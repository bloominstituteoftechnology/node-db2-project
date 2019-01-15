const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');


//connection to the data base
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here for the zoo

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
server.get('/api/zoos/:zooid', async (req, res) => {
  try {
    const {zooid} = req.params;
    const zoo = await db('zoos').where({id: zooid}).first();
    if(zoo){
      res.status(200).json(zoo);
    } else {
      res.status(404).json({message: "Please provide the correct ID of the zoo"})
    }
  }
  catch (err){
    res.status(500).json({message: "There was an error while trying to retrieve a zoo from the data base"});
  }
});

//DELETE /api/zoos/:id
server.delete('/api/zoos/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const count = await db('zoos').where({id}).del();

    if(!count || count < 1){
        res.status(404).json({message: "Zoo was not found to be removed"})
    } else{
        res.status(200).json(count);
    }
  }
  catch (err) {
    res.status(500).json({message: "There was an error while trying to delete a zoo from the data base"});
    }
});

//PUT /api/zoos/:id 
server.put('/api/zoos/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    if (changes.name.length > 0) {
      const updated = await db('zoos').where({id}).update(changes);
      res.status(200).json(updated);
    } else {
      res.status(404).json({message: "Please enter the name of the zoo"});
    }
  }
  catch (err){
    res.status(500).json({message: "There was an error while trying to update a zoo in the data base"});
  }
});

// endpoints here for the bears table

//POST /api/bears
server.post('/api/bears', async (req, res) => {
  try {
    const bear = req.body;
    if(bear.name.length > 0){
      const newBear = await db.insert(bear).into('bears');
      res.status(200).json(newBear);
    } else {
      res.status(404).json({message: "Please enter the name of the bear"});
    }
  }
  catch (err) {
    res.status(500).json({message: "There was an error while trying to save a bear to the data base"});
  }
});


//GET /api/bears
server.get('/api/bears', async (req, res) => {
  try {
    const bears  = await db('bears');
    res.status(200).json(bears);
  }
  catch (err) {
    res.status(500).json({message: "There was an error while trying to connect to the data base"});
  }
});

//GET /api/bears/:id
server.get('/api/bears/:bearid', async (req, res) => {
  try {
    const { bearid } = req.params;
    const bear = await db('bears').where({id: bearid}).first();
    if(bear){
      res.status(200).json(bear);
    } else {
      res.status(404).json({message: "Please provide the correct ID of the bear"})
    }
  }
  catch (err){
    res.status(500).json({message: "There was an error while trying to retrieve a bear from the data base"});
  }
});

//DELETE /api/bears/:id
server.delete('/api/bears/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const count = await db('bears').where({id}).del();

    if(!count || count < 1){
        res.status(404).json({message: "Bear was not found to be removed"})
    } else{
        res.status(200).json(count);
    }
  }
  catch (err) {
    res.status(500).json({message: "There was an error while trying to delete a bear from the data base"});
    }
});

//PUT /api/bears/:id 
server.put('/api/bears/:id', async(req, res) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    if (changes.name.length > 0) {
      const updated = await db('bears').where({id}).update(changes);
      res.status(200).json(updated);
    } else {
      res.status(404).json({message: "Please enter the name of the bear"});
    }
  }
  catch (err){
    res.status(500).json({message: "There was an error while trying to update a bear in the data base"});
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
