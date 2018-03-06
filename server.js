const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

const check = require('./controllers/validations/validationsController');
const zoo = require('./controllers/zoos/zoosController');
const bear = require('./controllers/bears/bearsController');

// endpoints here
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running...' });
});

server.post('/zoos', check.zoo, zoo.create);

server.get('/zoos', zoo.get);

server.get('/zoos/:id', check.id, zoo.getById);

server.post('/zoos/:id', check.id, check.zoo, zoo.edit);

server.delete('/zoos/:id', check.id, zoo.del);

server.post('/bears', check.bear, bear.create);

server.get('/bears', bear.get);

server.get('/bears/:id', check.id, bear.getById);

server.post('/bears/:id', check.id, check.bear, bear.edit);

server.delete('/bears/:id', check.id, bear.del);

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
