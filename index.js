const express = require('express')

const helmet = require('helmet');
const knex = require('knex')

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3',
  },
}

const db = knex(knexConfig);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post
    db('zoos')
    .insert(req.body)
    .then(ids => {
      req.params.name ? res.status(201).json(id) : res.status(402).json({message: "Contains no name"})
    })

router.get


router.post


router.put


router.delete



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
