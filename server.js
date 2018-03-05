const express = require('express');
const bodyParser = require('body-parser');

const knex = require('./database/db.js')

const server = express();

server.use(bodyParser.json());

// endpoints here

server.get('/', (req, res) => {
  res.status(200).json({ api: 'running!' })
})

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
