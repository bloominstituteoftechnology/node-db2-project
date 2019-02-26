const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

const knexConfigy = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'
  }
}

const deebee = knex(knexConfigy)

// endpoints here

server.get('/api/zoos', (req,rez) =>{
  deebee('zoos')
  .then( stuff => {
    rez.status(200).json(stuff)
  })
  .catch( err => {
    rez.status(500).json(
      { message: 'Not sure how to screw this one up, but you sure did (or the DB is empty)...'}
    )
  })

})

server.get('/api/zoos/:id', (req, rez) => {
  deebee('zoos').where({id: req.params.id})
  .then( things => {
    rez.status(200).json(things)
  })
  .catch( err => {
    rez.status(500).json(
      { message: 'Failed.  Probably not sending an actual ID...'}
    )
  })
})


server.post('/api/zoos', (req, rez) =>{
  deebee('zoos').insert(req.body)
  .then( somestuff => {
    rez.status(200).json(`Added to DB at # ${somestuff}`)
  })
  .catch( err => {
    rez.status(500).json(
      { message: 'Failed.  You probably posted an animal that already exists...'}
    )
  })

})


server.put('/api/zoos/:id', (req, rez) => {
  deebee('zoos').where({id: req.params.id}).update(req.body)
  .then( thingshappened => {
    console.log(thingshappened);
    if (thingshappened){
    rez.status(201).json({message: 'You updated that there aminal'})
    }
    else {
      rez.send('Dude, where\'s my animal?  Dude! Your animal ID doesn\'t exist, bruh...')
    }
  })
  .catch( err => {
    rez.status(500).json(
      { err, message: 'Failed.  You might be updating this TO something that already exists...'}
    )
  })

})


server.delete('/api/zoos/:id', (req, rez) => {
  var randomthing = req.params.id;
  deebee('zoos').where({id: randomthing}).del()
  .then(thingsgone => {
    if (!thingsgone) {
      rez.send('Yo... you done tried to delet an animal that is not there...')
    } else {
      rez.status(404).json({message: 'Looks like you put that animal to sleep...'})
    }
  })
  .catch( err => {
    rez.status(500).json(
      { err, message: 'Failed.  You tried something really really really wrong...'}
    )
  })

})







// - sanity -

server.get('/', (req, res) => {
  res.send (`
    <h1>Heyo, Captain Jack</h1>
  `)
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
