const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('./knexfile.js');

const server = express();

server.use(bodyParser.json());
server.use(cors());


// endpoints here

const port = process.env.PORT || 3000;
server.get('/', (req, res) => {
    res.status.json({
        message: 'Wahoo!'
    });
});
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});
