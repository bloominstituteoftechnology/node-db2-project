const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const db = knex ({
  client:'sqlite3',
  connection: {
    filename: './data/lambda.sqlite3',
  },
  useNullAsDefault: true,
});

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post("/api/zoos", (req, res) => {
  const zoo = req.body

  db.insert(zoo)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

server.get("/", (req, res) => {
  res.send('The Server is running')
});

server.get("/api/zoos", (req, res) => {
  db('zoos')
  .then(list => {
    res.status(200).json(list)
  })
  .catch(err => {
    res.status(500).json(err)
  })
});

server.get("/api/zoos/:id", async (req, res) => {
  try {
    const {id} = req.params
    const zoo = await db('zoos').where({id}).first()

    if(zoo){
      res.status(200).json(zoo)
    } else {
      res.status(404).json({message: 'Zoo not found'})
    }
  }catch(err) //the syntax doesn't seem right here, but the .catch throws an error
  {
    res.status(500).json(err)
  } 
});

server.put("/api/zoos/:id", (req, res) => {
  const {id} = req.params
  const changes = req.body

  db('zoos')
  .where({id})
  .update(changes)
  .then(count => {
    if(!count || count < 1) {
      res.status(404).json({message: 'Cannot update, zoo not found.'})
    } else {
      res.status(200).json(count)
    }
  }).catch(err => {
    res.status(500).json(err)
  })
});

server.delete('/api/zoos/:id', (req, res) =>{
  const { id } = req.params

   db('zoos').where({ id })
    .del()
    .then(count => {
       if (!count || count < 1) {
        res.status(404).json({ message: 'No records found to delete' })
       } else {
        res.status(200).json(count)
       }
     }).catch(err => {
      res.status(500).json(err)
    })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
