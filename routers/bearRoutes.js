const express = require('express');

const bearDB = require('./bearsModel');

const router = express.Router();



router.post('/', (req, res) =>{
    const bear = req.body;
    if(!bear.name){res.status(400).json({error:"Please include a name!"})}
     bearDB.add(bear) 
    .then(ids=>{
      res.status(201).json(ids)
    })
    .catch(err =>{
      res.status(500).json({error:"Unable to add the bear."})
    })
  })
  
  router.get('/', (req, res) =>{
    bearDB.getAll()
    .then(bears =>{
      if(bears.length > 0){
        res.json(bears)
      }else{
        res.status(404).json({error:"No bears have been added"})
      }
    })
    .catch(err =>{
      res.status(500).json({error:"Unable to retrieve the bears from the database!"})
    })
    
  })
  
  router.get('/:id', async (req, res) =>{
   try {
     const { id } = req.params
  
     const bear = await bearDB.findById(id)
     if(bear){
       res.json(bear)
     }else{
       res.status(404).json({error: "The bear with the specified id does not exist!"})
     }
   } catch(err) {
      res.status(500).json({error:"Could not retrieve information from the database!"})
   }
  
    
  })
  
  router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    bearDB.remove(id)
    .then(deletedBear =>{
      if(deletedBear){
        res.status(201).json({message:"Bear deleted"})
      }else{
        res.status(404).json({error:"Unable to delete specified Bear!"})
      }
    })
  })
  
  router.put('/:id', (req, res) =>{
    const { id } = req.params;
    const bear = req.body;
  
    bearDB.update(id, bear)
    .then(count =>{
      if(count){
        bearDB.findById(id).then(updated =>{
          res.status(201).json(updated)
        }).catch(err =>{
          res.status(404).json({error:"No records found to updated"})
        })
      }
    }).catch(err =>{
      res.status(500).json({error:"Could not update the bear!"})
    })
  })


  module.exports = router;