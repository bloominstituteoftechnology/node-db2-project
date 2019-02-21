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

// **setup of endpoints for the server + logic for interacting w/database**

//  POST endpoint & INSERT logic
server.post('/characters', (req, res) => { // create "characters" endpoint
  const character = req.body // initialize 'character' constant as defined by the request body

  db.insert(character) // insert character into database
    .into('characters') //  into the characters table
    .then(ids => { res.status(201).json(ids) }) //  **even When multiple records are inserted, only ONE id is returned.
    .catch(err => { res.status(500).json(err) })
})

//  PUT endpoint & UPDATE logic
server.put('./characters/id', (req, res) => {
  const changes = req.body  //  intialize 'changes' constant to represent upcoming changes defined by user input
  const { id } = req.params // the curly brackets around 'id' denote that id equates to a *key* of params 
                            //  and is not the req.params object itself

  db('characters')  // points knex to 'characters' table
    .where('id', '=', id) // or '.where({ id: id })' - selects record to be updated,
    .update(changes)      // in this case whichever character's id matches the user-input id. '.update' passes in an object 'changes'
    .then(count => { res.status(200).json(count) }) //  which then overwrites the existing fields based upon what is passed in
    .catch(err => { res.status(500).json(err) })  //  finally, the number of *records* (not fields) that have been updated
})                                                //  are returned with a status code

// DELETE endpoint & DEL logic

/*  
  To remove records from a table, we can use the DELETE command. 
  We can specify a condition to choose which records should be deleted. 
  If no condition is specified, all records will be deleted.  
  To delete all rows we simply remove the WHERE clause.

  It is recommended to first use a SELECT statement 
  to verify that we are targeting the right records with our WHERE condition 
  before executing a DELETE statement.
*/

server.delete('./characters/:id', (req, res) => {
  const { id } = req.params

  db('characters')
    .where({ id }) // or '.where(id, '=', id)
    .del()
    .then(count => { res.status(200).json(count) })
    .catch(err => { res.status(500).json(err) })
})


//  **intialization of server**

server.listen(port, function() { // server listens on port 8000
  console.log(`===Web API Listening on http://localhost:${port}===`); // notification via console of server activity
});