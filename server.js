const express = require('express');
const bodyParser = require('body-parser');

const zooRouter = require('./routes/zoos');
const bearRouter = require('./routes/bears');

const server = express();

server.use(bodyParser.json());
server.use('/zoos', zooRouter);
server.use('/bears', bearRouter);

const check = require('./controllers/validations/validationsController');
const zoo = require('./controllers/zoos/zoosController');
const bear = require('./controllers/bears/bearsController');

// endpoints here
server.get('/', (req, res) => {
  res.status(200).json({ api: 'running...' });
});

// server
//   .route('/zoos')
//   .get(zoo.get)
//   .post(check.zoo, zoo.create);

// server
//   .route('/zoos/:id')
//   .get(check.id, zoo.getById)
//   .post(check.id, check.zoo, zoo.edit)
//   .delete(check.id, zoo.del);

// server.get('/zoos', zoo.get);

// server.get('/zoos/:id', check.id, zoo.getById);

// server.post('/zoos/:id', check.id, check.zoo, zoo.edit);

// server.delete('/zoos/:id', check.id, zoo.del);

// server
//   .route('/bears')
//   .get(bear.get)
//   .post(check.bear, bear.create);

// server
//   .route('/bears/:id')
//   .get(check.id, bear.getById)
//   .post(check.id, check.bear, bear.edit)
//   .delete(check.id, bear.del);
// server.post('/bears', check.bear, bear.create);

// server.get('/bears', bear.get);

// server.get('/bears/:id', check.id, bear.getById);

// server.post('/bears/:id', check.id, check.bear, bear.edit);

// server.delete('/bears/:id', check.id, bear.del);

const port = 3000;
server.listen(port, function() {
  console.log(`Server Listening on ${port}`);
});
