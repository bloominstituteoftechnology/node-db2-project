const express = require("express");
const knex = require("knex");

const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

const router = express.Router();

router.get("/", async (req, res) => {
  const bears = await db("bears");

  try {
    res.json(bears);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Unable to retrieve the bears data from the server" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const bear = await db("bears")
      .where({ id })
      .first();

    res.json(bear);
  } catch (err) {
    res.json({ error: "Unable to fetch the bear with that id." });
  }
});

router.post("/", (req, res) => {
  const bear = req.body;

  db.insert(bear)
    .into("bears")
    .then(ids => res.status(201).json(ids))
    .catch(err => res.json({ error: "Unable to add a new bear." }));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db("bears")
    .where({ id })
    .del()
    .then(count => res.json({ count }))
    .catch(err => res.json({ error: "Unable to delete the bear." }));
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db("bears")
    .where({ id })
    .update(changes)
    .then(count => res.json({ count }))
    .catch(err => res.json({ error: "Unable to update the bear." }));
});

module.exports = router;
