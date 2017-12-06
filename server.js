const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db.js');
const sqlite = require('sqlite3');

const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/videos', (req, res) => {
    db('users')
        .then((user) => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json({ err });
        });
});


const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
