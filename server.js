const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

// endpoints here

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${ port }`);
});
