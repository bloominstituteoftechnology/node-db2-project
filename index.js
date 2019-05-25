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

server.get('/hello', (req,res)=>{
  res.send('Hi There!')
  })

server.post('/', (req,res)=>{
    db('zoos')
    .insert(req.body, ['id','name'])
    .then(results=>{
      res.status(201).json(results);
    })
    .catch(error =>{
      res.status(500).json({ error: "Some useful error message" })
    })
  })

server.get('/:id',(req, res)=>{
  db('zoos')
  .where({id:req.params.id})
  .first()
  .then(roles=>{
    res.status(200).json(roles);
  })
  .catch(error =>{
    res.status(500).json(error);
  })
})  
// endpoints here

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
