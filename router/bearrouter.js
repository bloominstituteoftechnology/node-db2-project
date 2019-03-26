const router = require('express').Router()

const knex = require('knex')

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3',
  },
}

const db = knex(knexConfig);

// endpoints here
router.route('/')
    .get(async (req, res) => {
      try{
        const bears = await db('bears');
        res.status(200).json(bears)

      }
      catch(error){
        res.status(500).json({message: "There was an error retrieving the bears", error: error})
      }
    })
    .post(async (req, res) => {
      try{
        const bear= req.body
        if (!bear){
          res.status(404).json({message: 'No name in body'})
        }
        const post = await db.insert(bear).into('bears')
        res.status(201).json({bearId: post[0], message:"Bear post created successfully"})
      }
      catch(error){
        res.status(500).json(error)
      }
    })

router.route('/:id')
  .get(async (req,res)=>{
    const {id} = req.params
    const bear = await db('bears').where({id : id})
    try{
      if(!bear){
        res.status(404).json({message: "Bear not found"})
      }
      res.status(200).json(bear[0])
    }
    catch(error){
        res.status(500).json(error)
    }
  })
  .put(async (req, res)=>{
    const { id } = req.params 
    const { name } = req.body
    try{
      if(!name){
        res.status(400).json({message: "No name in body"})
      }
      const count = await db('bears').where({id:id}).update({ name })
      if (count > 0 ){
        res.status(200).json({message:"Bear was updated successfully"})
      }
      else{
        res.status(404).json({message: "Bear not found"})
      }
    }
    catch(error){
      res.status(500).json({message: "Error updating the bear"})
    }

  })
  .delete(async (req, res)=> {
    const { id } = req.params
    try{
      const count = await db('bears').where({id:id}).del()
      if(count > 0){
        res.status(200).json({message: "Bear was removed successfully"})
      }
      else{
        res.status(404).json({message: "Bear was not found"})
      }
    }
    catch(error){
      res.status(500).json({message: "Error deleting bear from the database", error: error})
    }
  })

module.exports = router