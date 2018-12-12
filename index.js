const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
});

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.post("/api/zoos", (req, res) => {
  // `POST /api/zoos`
  // When the client makes a `POST` request to this endpoint, a new _zoo_
  // should be created in the _zoos_ table.
  // Ensure the client passes a `name` property in the request body.
  // If there's an error, respond with an appropriate status code, and send
  // a JSON response of the form `{ error: "Some useful error message" }`.
  // Return the `id` of the inserted zoo and a 201 status code.

  const name = req.body;

  db.insert(name)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/zoos", (req, res) => {
  // ### `GET /api/zoos`
  // When the client makes a `GET` request to this endpoint, return a list of all the _zoos_
  // in the database. Remember to handle any errors and return the correct status code.

  db("zoos")
    .select()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/zoos/:id", (req, res) => {
  // ### `GET /api/zoos/:id`
  // When the client makes a `GET` request to `/api/zoos/:id`, find the _zoo_ associated
  // with the given `id`. Remember to handle errors and send the correct status code.
  const zooId = req.params.id;

  db("zoos")
    .where("id", zooId)
    .select()
    .then(zoo => {
      if (zoo.length) {
        res.status(200).json(zoo);
      } else {
        res
          .status(404)
          .json({ message: `Could not find zoo with id ${zooId}` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get any zoos." });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  // ### PUT /api/zoos/:id
  // When the client makes a `PUT` request to this endpoint passing an object with the
  // changes, the _zoo_ with the provided `id` should be updated with the new information.
});

server.delete("/api/zoos/:id", (req, res) => {
  // ### DELETE /api/zoos/:id
  // When the client makes a `DELETE` request to this endpoint, the _zoo_ that has the
  // provided `id` should be removed from the database.
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
