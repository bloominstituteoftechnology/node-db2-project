//  initialization of express server
const express = require('express'); 
const server = express(); 
const parser = express.json()
const port = 8000;

//  initialization of database
const knex = require('knex') 
const knexConfig = require('./knexfile')
const db = knex(knexConfig.development) 

//  initialization of middlewares
const helmet = require('helmet')
const logger = require('morgan')
server.use(parser, logger('tiny'), helmet()) // Apply middlewares + parser

/* initialization of CRUD logic */

//  POST/insert logic
server.post('/api/zoos', (req, res) => { 
  const zoo = req.body 
  if (req.body.name) {
    db.insert(zoo) 
    .into('zoos') 
    .then(ids => { res.status(201).json(ids) }) 
    .catch(err => { res.status(500).json({ message: "Technical error:" + err }) })
  }

  else {
          res
            .status(500)
            .json( { message: "Invalid user input (name is required & must be unique!)" })}
})
/*END*/

// GET logic
server.get('/api/zoos', (req, res) => {
})

server.listen(port, function() { console.log(`===Web API Listening on http://localhost:${port}/===`)})

/*
server.put('./zoos/id', (req, res) => {
  const changes = req.body  
  const { id } = req.params 

  db('zoos')  
    .where('id', '=', id) 
    .update(changes)      
    .then(count => { res.status(200).json(count) }) 
    .catch(err => { res.status(500).json({ message: "" + err})  
})                                                

server.delete('./zoos/:id', (req, res) => {
  const { id } = req.params

  db('zoos')
    .where({ id }) 
    .del()
    .then(count => { res.status(200).json(count) })
    .catch(err => { res.status(500).json(err) })
})
*/