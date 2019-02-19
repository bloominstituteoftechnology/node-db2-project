const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

//POST /api/zoos
server.post("/api/zoos", async (req, res) => {
  try {
    const [id] = await db("zoos").insert(req.body);

    res.status(201).json(id);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET /api/zoos
server.get("/api/zoos", async (req, res) => {
  try {
    const zoos = await db("zoos");
    res.status(200).json(zoos);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET /api/zoos/:id
server.get("/api/zoos/:id", async (req, res) => {
  try {
    const zoo = await db("zoos").where({ id: req.params.id });
    if (zoo.length === 0) {
      res
        .status(404)
        .json({ error: "The specified ID does not exist in the database." });
    } else {
      res.status(200).json(zoo);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE /api/zoos/:id
server.delete("/api/zoos/:id", async (req, res) => {
  try {
    const records = await db("zoos")
      .where({ id: req.params.id })
      .del();
    if (records === 0) {
      res
        .status(404)
        .json({
          error:
            "A record with the specified ID does not exist and cannot be deleted."
        });
    } else {
      res.status(204).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//PUT /api/zoos/:id
server.put("/api/zoos/:id", async (req, res) => {
  try {
    const record = await db("zoos")
      .where({ id: req.params.id })
      .update(req.body);
    console.log(record);
    if (record === 0) {
      res
        .status(404)
        .json({
          error:
            "A record with the specified ID does not exist and cannot be updated."
        });
    } else {
      const zoo = await db("zoos")
        .where({ id: req.params.id })
        .first();
      res.status(200).json(zoo);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

const errors = {
  "19": "A record with that name already exists. Please provide a unique name."
};

const errorMessage = "There was an error.";

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
