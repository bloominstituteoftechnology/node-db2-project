const express = require('express');

const zoos = require('../zoosModel.js');

const router = express.Router();
  
  // get list of zoos
  router.get('/', (req, res)=>{
    zoos.find()
      .then(zoos =>{
        res.status(200).json(zoos);
      })
      .catch(err => res.status(500).json(err));
  });
  
  // get zoo by ID
  router.get('/:id', async (req, res)=>{
    try{
      const {id} = req.params;
      const zoo = await zoos.findById(id);
      if(zoo){
        res.status(200).json(zoo);
      }else{
        res.status(404).json('No zoo with that ID found.');
      }
    } catch(err) {
      res.status(500).json(err);
    }
  });
  
  // create a zoo
  router.post('/', (req, res)=>{
    //grab data from body
    const zoo = req.body;
    // save data to database
    zoos.add(zoo)
    // return id of newly created record
      .then(ids =>{
        res.status(201).json(ids[0]);
      })
      .catch(err =>{
        res.status(500).json(`Error: body must have only 'name' key; otherwise value not unique or null.`)
      });
  });
  
  // update a zoo
  router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const changes = req.body;
    zoos.update(id, changes)
      .then(count =>{
        if(count>0){
          res.status(200).json(count);
        }else{
          res.status(404).json('No zoo with that ID found.');
        }
      })
      .catch(err => res.status(500).json(err));
  });
  
  // delete a zoo
  router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    zoos.remove(id)
      .then(count =>{
        if(count>0){
          res.status(200).json(count);
        }else{
          res.status(404).json('No zoo with that ID found.');
        }
      })
      .catch(err => res.status(500).json(err));
  })
  
  module.exports = router;