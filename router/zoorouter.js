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
        const zoos = await db('zoos');
        res.status(200).json(zoos)

      }
      catch(error){
        res.status(500).json({message: "There was an error retrieving the zoos", error: error})
      }
    })
    .post(async (req, res) => {
      try{
        const zoo= req.body
        if (!zoo){
          res.status(404).json({message: 'No name in body'})
        }
        const post = await db.insert(zoo).into('zoos')
        res.status(201).json({zooId: post[0], message:"Zoo post created successfully"})
      }
      catch(error){
        res.status(500).json(error)
      }
    })

router.route('/:id')
  .get(async (req,res)=>{
    const {id} = req.params
    const zoo = await db('zoos').where({id : id})
    try{
      if(!zoo){
        res.status(404).json({message: "Zoo not found"})
      }
      res.status(200).json(zoo[0])
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
      const count = await db('zoos').where({id:id}).update({ name })
      if (count > 0 ){
        res.status(200).json({message:"Zoo was updated successfully"})
      }
      else{
        res.status(404).json({message: "Zoo not found"})
      }
    }
    catch(error){
      res.status(500).json({message: "Error updating the zoo"})
    }

  })
  .delete(async (req, res)=> {
    const { id } = req.params
    try{
      const count = await db('zoos').where({id:id}).del()
      if(count > 0){
        res.status(200).json({message: "Zoo was removed successfully"})
      }
      else{
        res.status(404).json({message: "Zoo was not found"})
      }
    }
    catch(error){
      res.status(500).json({message: "Error deleting zoo from the database", error: error})
    }
  })

module.exports = router