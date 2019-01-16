const express = require('express');

const zooDb = require('./zooModel.js');

const router = express.Router();



router.post('/', (req, res) =>{
    const zoo = req.body;
    if(!zoo.name){res.status(400).json({error:"Please include a name!"})}
      zooDb.add(zoo)
    .then(ids=>{
      res.status(201).json(ids)
    })
    .catch(err =>{
      res.status(500).json({error:"Unable to add the zoo."})
    })
  })
  
  router.get('/', (req, res) =>{
    zooDb.getAll()
    .then(zoos =>{
      if(zoos.length > 0){
        res.json(zoos)
      }else{
        res.status(404).json({error:"No zoos have been added"})
      }
    })
    .catch(err =>{
      res.status(500).json({error:"Unable to retrieve the Zoos from the database!"})
    })
    
  })
  
  router.get('/:id', async (req, res) =>{
   try {
     const { id } = req.params
  
     const zoo = await zooDb.findById(id)
     if(zoo){
       res.json(zoo)
     }else{
       res.status(404).json({error: "The Zoo with the specified id does not exist!"})
     }
   } catch(err) {
      res.status(500).json({error:"Could not retrieve information from the database!"})
   }
  
    
  })
  
  router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    zooDb.remove(id)
    .then(deletedZoo =>{
      if(deletedZoo){
        res.status(201).json({message:"Zoo deleted"})
      }else{
        res.status(404).json({error:"Unable to delete specified Zoo!"})
      }
    })
  })
  
  router.put('/:id', (req, res) =>{
    const { id } = req.params;
    const zoo = req.body;
  
    zooDb.update(id, zoo)
    .then(count =>{
      if(count){
        zooDb.findById(id).then(updated =>{
          res.status(201).json(updated)
        }).catch(err =>{
          res.status(404).json({error:"No records found to updated"})
        })
      }
    }).catch(err =>{
      res.status(500).json({error:"Could not update the Zoo!"})
    })
  })
  

  module.exports = router;