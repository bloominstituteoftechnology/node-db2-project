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
//200 - Successful update, send back updated action
//201 - Created  
//400 - body information is missing, 
//404 - Invalid id, item not found
//500 - Something went wrong, internal error
//more codes @ https://httpstatuses.com/

//  Create logic
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
          .json( { message: "Invalid user input (name is required & must be unique!)" })
        }
})
/*END*/

// Read logic
server.get('/api/zoos', (req, res) => {
  db.select()
    .from('zoos')
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({ message: 'Server error! Technical error: ' + err}))
})
/*END*/

// Read by ID logic
server.get('/api/zoos/:id', (req, res) => {
  const { id } = req.params
  
    db('zoos')
      .where({ id: id })
      .first()
      .then(zoos => { 
        if (zoos) { res.status(200).json(zoos) } 
        else { res.status(404).json({ message: `404 - zoo with id ${id} not found.` })  } 
      })
      .catch(err => res.status(500).json(err))
})
/*END*/

// Update by ID logic
server.put('/api/zoos/:id', (req, res) => {
  const changes = req.body  
  const { id } = req.params 
  
  db('zoos')  
    .where({ id: id }) 
    .update(changes)      
    .then(count => res.status(200).json(count)) 
    .catch(err =>  res.status(500).json({ message: "!!! " + err})) 
})
/*END*/

//  Delete by ID logic
server.delete('/api/zoos/:id', (req, res) => {
  const { id } = req.params

  db('zoos')
    .where({ id: id }) 
    .first()
    .del()
    .then(count => { 
      if (count) { res.status(200).json(count) } 
      else { res.status(404).json({ message: `404 - zoo with id ${id} not found.` })  } 
    })
    .catch(err => { res.status(500).json(err) })
})

server.listen(port, function() { 
  console.log(`===Web API Listening on http://localhost:${port}===`)
})
