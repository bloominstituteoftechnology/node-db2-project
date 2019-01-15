const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/api/zoos", async (req, res) => {
  res.send(`It's working`);
  // const zoos = await db.get("zoos");
  // try {
  //   res.json(zoos);
  // } catch (err) {
  //   res
  //     .status(500)
  //     .json({ error: "Unable to retrieve the Zoos data from the server" });
  // }
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into("zoos")
    .then(id => res.status(201).json(id))
    .catch(err => res.json({ error: "Unable to add a new zoo." }));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
