const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", async (req, res) => {
  const zoos = await db("zoos");

  try {
    res.json(zoos);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unable to retrieve the Zoos data from the server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const zoo = await db("zoos")
      .where({ id })
      .first();

    res.json(zoo);
  } catch (err) {
    res.json({ error: "Unable to fetch the zoo with that id." });
  }
});

router.post("/", (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into("zoos")
    .then(ids => res.status(201).json(ids))
    .catch(err => res.json({ error: "Unable to add a new zoo." }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(count => res.json({ count }))
    .catch(err => res.json({ error: "Unable to delete the zoo." }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("zoos")
    .where({ id })
    .update(changes)
    .then(count => res.json({ count }))
    .catch(err => res.json({ error: "Unable to update the zoo." }));
});

module.exports = router;
