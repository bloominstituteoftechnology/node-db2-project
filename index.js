// **basic setup for server & database**
const express = require('express'); // call in express
const server = express(); //
server.use(express.json()); //
const port = 8000; // create port for server to listen on

const knex = require('knex') // initialize knex
const knexConfig = require('./knexfile')// use 'knexfile' config file to configure knex
const db = knex(knexConfig.development) //  intialize server with its configuration according to the 
                                        //  'knexConfig' object's developement key

/* #region classical way of intitializing db without using 'knexfile' configuration file

const db = knex({ // intialize database
  client: 'sqlite3',
  connection: { // define database connection
    filename: './data/db.sqlite3' // define database file location
  },
  useNullAsDefault: true,
}); // Moving forward, the 'db' constant will denote our database!

*/

// **setup of endpoints for the server**

server.post('/characters', (req, res) => { // create "characters" endpoint
  const character = req.body // initialize 'character' constant as defined by the request body

  db.insert(character) // insert character into database
  .into('characters') //  into the characters table
  .then(ids => { res.status(201).json(ids) })
  .catch(err => { res.status(500).json(err) })
})

//  **intialization of server**

server.listen(port, function() { // server listens on port 8000
  console.log(`===Web API Listening on http://localhost:${port}===`); // notification via console of server activity
});