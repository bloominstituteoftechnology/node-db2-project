const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const cors = require('cors');

const zoosRoutes = require('./routes/zoosRoutes.js');
const bearsRoutes = require('./routes/bearsRoutes.js');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();


server.use(express.json());
server.use(helmet());
server.use(cors());
server.use('/api/zoos', zoosRoutes);
server.use('/api/bears', bearsRoutes);


// ROUTES

// Add home route
server.get('/', (req, res) => {
  res.send("You are home");
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

