const express = require('express');
const helmet = require('helmet');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3'
  },
  useNullAsDefault: true
}
const knex = require('knex');
// const knexConfig = require('./knexfile');
const db = knex(knexConfig)

const server = express();

server.use(express.json());
server.use(helmet());

// // endpoints here

//add
server.post('/api/zoos', (req, res)=>{
  db('zoos').insert(req.body)
  .then(zoo => res.status(201).json(zoo))
  .catch(err => res.status(500).json(err))
})

//get all
server.get('/api/zoos', (req, res)=>{
  db.select().from('zoos')
  .then(zoos => res.status(200).json(zoos))
  .catch(err => res.status(500).json(err))
})

//get by id
server.get('/api/zoos/:id', (req, res) =>{
  const id = req.params.id;

  db.select().where({id}).first().from('zoos')
  .then(zoo => {
    if(zoo) {
      res.status(200).json(zoo)
    }else {
      res.status(404).json({message: 'zoo not found'})
    }
  })
  .catch(err => res.status(500).json(err))
})

//delete
server.delete('/api/zoos/:id', (req, res) =>{
  const id = req.params.id;
  db('zoos').where('id', id).del()
  .then(del =>{
    if(del) {
      res.status(204)
    } else {
      res.status(404).json({message: 'zoo not found'})
    }
  })
  .catch(err => res.status(500).json(err))
})

//update
server.put('/api/zoos/:id', (req, res) =>{
const id = req.params.id;

db('zoos').where({ id }).update(req.body)
.then(zoo => {
  if(zoo) {
    res.status(201).json({message: 'zoo updated'})
  } else {
    res.status(404).json({message: 'zoo not found'})
  }
})
.catch(err => console.log(err))
})


const port = 5000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
