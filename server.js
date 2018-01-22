const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

// endpoints here

const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});

// raw connector || query builder || ORM: Object Relational Mapper
// SQL Injection

const bear = { 
    name: 'Po',
    species: 'Panda',
    latinName: 'ursus kunfusious',
    partners: [
        { name: 'asfsd', species: 'monkey' },
    ]
};
