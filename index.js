const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const sendError = (
  res,
  message = "Server Error. Check connection and try again.",
  errStatus = 500
) => {
  res.status(errStatus).json({ message: message });
};

// endpoints here
server.get("/", (req, res) => res.status(200).send("<h1>we made it</h1>"));

server.get("/api/zoos", async (req, res) => {
  try {
    const zoos = await db("zoos");
    res.status(200).json(zoos);
  } catch (err) {
    sendError(res);
  }
});

server.get("/api/zoos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const zoo = await db("zoos").where({ id });
    res.status(200).json(zoo[0]);
  } catch (err) {
    sendError(res, `Could not find zoo at id:${id}`);
  }
});

server.post("/api/zoos", async (req, res) => {
  try {
    const newZoo = req.body;
    const id = await db("zoos").insert(newZoo);
    const zoo = await db("zoos").where({ id: id[0] });
    console.log(zoo);
    res.status(201).json(zoo);
  } catch (err) {
    sendError(res, "Zoo could not be added.");
  }
});

server.put("/api/zoos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newZoo = req.body;
    const count = await db("zoos")
      .where({ id })
      .update(newZoo);
    if (!count) {
      sendError(res, "No Zoos updated.");
      return;
    }
    const updatedZoo = await db("zoos").where({ id });
    res.status(201).json({ "updated zoo": updatedZoo[0] });
    res.status(200).json(zoo[0]);
  } catch (err) {
    sendError(res, "Could not update zoo");
  }
});

server.delete("/api/zoos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedZoo = await db("zoos").where({ id })
    const count = await db("zoos").where({ id }).del();
    if (!count) {
      sendError(res, "No Zoos deleted.");
      return;
    }
    res.status(200).json({deleted: deletedZoo[0]});
  } catch (err) {
    sendError(res, 'Could not delete zoo');
  }
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
