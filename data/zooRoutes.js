const express = require('express')
const knex = require('knex');
const knexConfig = require('../knexfile.js')
const db = knex(knexConfig.development)
const route = express.Router()

// endpoints here


// Add a new zoo
route.post('/', (req, res) => {
    const zoo = req.body;
  db('zoos')
  .insert(zoo)
  .then(zooObj => {
    res.status(201).json(`Success! Added a new zoo. A zoo with the ID of ${zooObj} is now in the database.`)
  })
  .catch(err => {res.status(500).json(err)})
  })
  
  // Get a list of all zoo objects
  route.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(err => res.status(500).json(err))
  })
  
  
  // Get a specific zoo object by id
  route.get('/:id', (req, res) => {
    const {id} = req.params;
    db('zoos')
    .where({id})
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(err => res.status(500).json(err))
  })
  
  // Update a specific zoo by id
  route.put('/:id', (req, res) => {
    const changes = req.body;
    const {id} = req.params;
    
    db('zoos')
    .where({id})
    .update(changes)
    .then(count => res.status(200).json(`Success! You updated ${count} zoo(s).`))
    .catch(err => res.status(500).json(err))
  })
  

  // Delete a specific zoo by id
  route.delete('/:id', (req, res) => {
    const {id} = req.params;
    
    db('zoos')
    .where({id})
    .delete()
    .then(count => res.status(200).json(`Success! You deleted ${count} zoo(s).`))
    .catch(err => res.status(500).json(err))
  })
  
  // sanity check
  route.get('/', (req, res) => {
   res.json({api: 'up'})
    })

    module.exports = route;