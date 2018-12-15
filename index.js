const express = require("express");
const helmet = require("helmet");
const knex = require("knex"),
  dbConfig = require("./knexfile"),
  db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// ~~~~~ POST ~~~~~
server.post("/api/zoos", (req, res) => {
  const { zoo } = req.body;
  db("zoos")
    .insert(zoo)
    .then(id => {
      res.status(201).json({ id });
    })
    .catch(err => {
      res.status(500).json({ error: "Creation failed, Please try again." });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

// ~~~~~ GET ~~~~
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.json({ zoos });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Cannot Fetch Zoos, Check your connection." });
    });
});
