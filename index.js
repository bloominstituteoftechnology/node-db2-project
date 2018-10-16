console.log("Howdy from index.js!!");

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');
const knex = require('knex');

//knex connections 
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);


const server = express();

server.use(express.json());
server.use(logger('combined'));
server.use(cors());
server.use(helmet());

// endpoints here
// const zooRoutes = reuire('./zoos/zooRoutes.js');
// server.use('/zoos', zooRoutes);

//list all
server.get('/api/zoos', (req, res) => {
  db('zoos').then(zoos => {
    res.status(200).json(zoos);
  })
  .catch(err => res.status(500).json(err));
});

//knex create
server.post('/api/zoos', (req, res) => {
  const zoo = req.body;
  db.insert(zoo)
  .into('zoos')
  .then(ids => {
    res.status(201).json(ids);
  })
  .catch(err => {
    res.status(500).json(err);
  });
});

//knex return by id, need the async so we can use await
server.get('/api/zoos/:id', async (req, res) => {
  //try/catch for error catching
  try {
  const { id } = req.params;
// this is a filter, an object that we pass in what we want from the db, in this case id
//we have to name this next part, zoos, b/c we are calling it below
//otherwise we just get an empty object when we invoke this path  
const zoos = await db('zoos').where({ id }).first();
  res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json(error);
  }
});
//we get an array back, why? b/c 'where' always gives back a collection
//which is presented in the form of an array so we can add .first()
//and it will give the individual objs w/out putting them in an array by 
//themselves

//knex delete

//knex update 


//index  middleware
const timeStamp = (req, res, next) => {
  console.log(`${Date.now()} ${req.method} made to ${req.url}`)
  next();
};

//server testing message
server.get('/', (req, res) => {
  res.send('Good Morning, your server is working just fine.');
});

const port = 3300;
server.listen(port, () => console.log(`API flapping like a dead fish on port http://localhost:${port}`));
