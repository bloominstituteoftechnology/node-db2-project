const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  if (zoo.name) {
    db.insert(zoo)
      .into("zoos")
      .then(id => {
        res.status(201).json(id);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({
      error: `The zoo doesn\'t even have a name? That's sad. Let's give it one and try again`
    });
  }
});

//

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
