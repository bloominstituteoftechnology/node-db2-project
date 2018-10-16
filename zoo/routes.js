const express = require('express');
const zoos = require('../zoosModel.js');
const router = express.Router();

const noId = `Id not found`
  // GET zoo list
  router.get('/', (req, res)=>{
    zoos.find()
      .then(zoos =>{
        res.status(200).json(zoos);
      })
      .catch(err => res.status(500).json(err));
  });

  // GET zoo Id
  router.get('/:id', async (req, res)=>{
    try{
      const {id} = req.params;
      const zoo = await zoos.findById(id);
      if(zoo){
        res.status(200).json(zoo);
      }else{
        res.status(404).json(noId);
      }
    } catch(err) {
      res.status(500).json(err);
    }
  });

  // CRATE zoo
  router.post('/', (req, res)=>{
    const zoo = req.body;
    zoos.add(zoo)
        .then(ids =>{
        res.status(201).json(ids[0]);
      })
      .catch(err =>{
        res.status(500).json(`Error: duplicate name keys not permitted.`)
      });
  });

  // UPDATE zoo
  router.put('/:id', (req, res)=>{
    const {id} = req.params;
    const changes = req.body;
    zoos.update(id, changes)
      .then(count =>{
        if(count>0){
          res.status(200).json(count);
        }else{
          res.status(404).json('ID not found.');
        }
      })
      .catch(err => res.status(500).json(err));
  });

  // DELETE zoo
  router.delete('/:id', (req, res)=>{
    const {id} = req.params;
    zoos.remove(id)
      .then(count =>{
        if(count>0){
          res.status(200).json(count);
        }else{
          res.status(404).json(noId);
        }
      })
      .catch(err => res.status(500).json(err));
  })

module.exports = router;
