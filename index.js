const express = require('express');
const helmet = require('helmet');
const knex = require('knex')

const knexConfig = require('./knexfile')
const db = knex(knexConfig.development)

const server = express();

server.use(express.json());
server.use(helmet());

const sendError = (res, message = 'Server Error. Check connection and try again.',errStatus= 500 )=>{
  res.status(errStatus).json({message: message})
}

// endpoints here
server.get('/', (req,res) => res.status(200).send('<h1>we made it</h1>'))

server.get('/api/zoos', async (req, res) =>{
  try{
  const zoos = await db('zoos')
  res.status(200).json(zoos)
  }catch(err){
    sendError(res)
  }
})

server.get('/api/zoos/:id', async (req, res) =>{
  try{
    const {id} = req.params
  const zoo = await db('zoos').where({id})
  res.status(200).json(zoo[0])
  }catch(err){
    sendError(res)
  }
})

server.post('/api/zoos', async (req, res) =>{
  try{
    const zoo = req.body
    const id = await db('zoos').insert(zoo)
    res.status(201).json(id)
  }catch(err){
    sendError(res, 'Zoo could not be added.')
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
