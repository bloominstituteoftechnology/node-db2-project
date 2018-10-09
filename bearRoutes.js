const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

const bearRoutes = express.Router();

// endpoints here
  bearRoutes.get('/', (req, res) => {
    db('bears')
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  })
  
  bearRoutes.get('/:id', async (req, res) => {
    try {
    const {id} = req.params;
  
    const zoo = await db('bears').where({id}).first();
      if(zoo){
        res.status(200).json(zoo);
      } else {
        res.status(404).json({error: "Requested zoo could not be found."})
      }
    } catch (err) {
      res.status(500).json(err);
    }
    
  })
  
  bearRoutes.post('/', (req, res) => {
    const course = req.body;
  
    db.insert(course)
    .into('bears')
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  
  })
  
  bearRoutes.put('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
  
    db('bears')
    .where({id})
    .update(changes)
    .then(count => {
      if(!count || count < 1){
        //error
        res.status(404).json()
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  })
  
  bearRoutes.delete('/:id', (req, res) => {
    const {id} = req.params;
  
    db('bears')
    .where({id})
    .del()
    .then(count => {
      if(!count || count < 1){
        //error
        res.status(404).json()
      } else {
        res.status(200).json(count);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  })

  module.exports = bearRoutes;