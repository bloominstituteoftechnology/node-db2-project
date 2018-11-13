const express = require('express')
const knex = require('knex');
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development)
const route = express.Router()

// endpoints here


// Add a new zoo
route.post('/', (req, res) => {
    const bear = req.body;
  db('bears')
  .insert(bear)
  .then(bearObj => {
    res.status(201).json(`Success! Added a new bear. A bear with the ID of ${bearObj} is now in the database.`)
  })
  .catch(err => {res.status(500).json(err)})
  })
  
  // Get a list of all zoo objects
  route.get('/', (req, res) => {
    db('bears')
    .then(bears => {
      res.status(200).json(bears)
    })
    .catch(err => res.status(500).json(err))
  })
  
  
  // Get a specific zoo object by id
  route.get('/:id', (req, res) => {
    const {id} = req.params;
    db('bears')
    .where({id})
    .then(bears => {
      res.status(200).json(bears)
    })
    .catch(err => res.status(500).json(err))
  })
  
  // Update a specific zoo by id
  route.put('/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    
    db('bears')
    .where({id})
    .update(changes)
    .then(count => res.status(200).json(`Success! You updated ${count} bear(s).`))
    .catch(err => res.status(500).json(err))
  })
  

  // Delete a specific zoo by id
  route.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    db('bears')
    .where({id})
    .delete()
    .then(count => res.status(200).json(`Success! You deleted ${count} bear(s).`))
    .catch(err => res.status(500).json(err))
  })
  
  // sanity check
  route.get('/', (req, res) => {
   res.json({api: 'up'})
    })

    module.exports = route;