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
server.route('/api/zoos')
    .get(async (req, res) => {
      try{
        const zoos = await db('zoos');
        res.status(200).json(zoos)

      }
      catch(error){
        res.status(500).json({message: "There was an error retrieving the zoos", error: error})
      }
    })

router.get


router.post


router.put


router.delete



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
