const knex = require('knex')

const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());


const knexConfig = {
  client:'sqlite3',
  connection: { //string or object
    filename:'./data/lambda.sqlite3', // from the root folder
  },
  useNullAsDefault:true,
  debug:true,
}

const db=knex(knexConfig);

// GET req to /hello
server.get('/hello', (req,res)=>{
  res.send('Hi There!')
  })
// GET req. to /
server.get('/', (req,res)=>{
  // select * from zoos
db('zoos') // returns a promise with all the rows
.then(zoos =>{
  res.status(200).json(zoos);
})
.catch(error =>{
  console.log(error);
  res.status(500).json(error);
})
})

// POST req. to zoos table
server.post('/', (req,res)=>{
    db('zoos')
    .insert(req.body, ['id','name'])
    .then(ids=>{
      db('zoos')
        .where({id: ids[0]})
        .first()
        .then(z=>{
          res.status(200).json(z)
        })
        .catch(error =>{
          res.status(500).json({ error: "Some useful error message" })
        })
    })
    
  })
// GET request with ID 
server.get('/:id',(req, res)=>{
  db('zoos')
  .where({id:req.params.id})
  .first()
  .then(roles=>{
    if (roles){
      res.status(200).json(roles);
    } else {
      res.status(404).json({message: 'Zoo Id not found'});
    }
  })
  .catch(error =>{
    res.status(500).json(error);
  })
})  
server.delete('/api/zoos/:id', (req, res)=>{
  db('zoos')
  .where()
})
//PUT req. to :id
server.put('/:id', (req,res)=>{
  db('zoos').where({id:req.params.id}).update(req.body)
  .then(count =>{
    if(count>0){
      res.status(200).json({message:`${count} ${count > 1 ? 'records':'record' }records updated`})
    } else {
      res.status(404).json({message:'zoo does not exist'})
    }
  })
  .catch(error =>{
    res.status(500).json(error);
  })
  
})
// DEL request to /:id
server.delete('/:id', (req, res)=>{
  db('zoos')
  .where({id:req.params.id})
  .del()
  .then(count=>{
    if(count>0){
      res.status(200).json({
        message:`${count} ${count>1? 'records DELETED':'record DELETED'}`
      })

    }else{
      res.status(404).json({message:'Zoo does not exist'})
    }
    
  }).catch(error=>{
    res.status(500).json(error)
  })

})
// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
