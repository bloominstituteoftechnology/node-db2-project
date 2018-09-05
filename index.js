const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const server = express();

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/", (req, res) => {
  res.send("API RUNNING");
});

// server.get("/api/zoos", (req, res) => {
//   db("zoos")
//     .select("name")
//     .then(names => {
//       res.status(200).json(names);
//     })
//     .catch(err => res.status(500).json(err));
// });

server.get("/api/zoos", async (req, res) => {
  try {
    let response = await db("zoos");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// server.post("/api/zoos", (req, res) => {
//   const name = req.body;
//   db.insert(name).into("zoos").then(ids => {
//     res.status(201).json(ids);
//   })
//   .catch(err => res.status(500).json(err));
// });

server.post("/api/zoos", async (req, res) => {
  try {
    let response = await db("zoos").insert(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// server.get("/api/zoos/:id", (req, res) => {
//   db("zoos")
//     .where({ id: req.params.id })
//     .then(id => {
//       res.status(200).json(id);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

server.get("/api/zoos/:id", async (req, res) => {
  try {
    let response = await db("zoos").where({ id: req.params.id });
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// server.put("/api/zoos/:id", (req, res) => {
//   db("zoos")
//     .where({ id: req.params.id })
//     .update(req.body)
//     .then(id => {
//       res.status(200).json(id);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

server.put("/api/zoos/:id", async (req, res) => {
  try {
    let response = await db("zoos")
      .where({ id: req.params.id })
      .update(req.body);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// server.delete("/api/zoos/:id", (req, res) => {
//   db("zoos")
//     .where(req.params)
//     .del()
//     .then(id => {
//       res.status(200).json(id);
//     })
//     .catch(err => {
//       res.status(500).json(err);
//     });
// });

server.delete("/api/zoos/:id", async (req, res) => {
  try {
    let response = await db("zoos")
      .where(req.params)
      .del();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
