const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/", (req, res) => {
  res.send("API Running...");
});

//get courses

server.get("/api/courses", (req, res) => {
  db("courses")
    .select("name")
    .then(courses => {
      res.status(200).json(err)
});
});

//add a course





server.post('/api/courses', (req, res) => {
  const course = req.body;

  db.insert(course)
    .into('courses')
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err)
    });
});

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
