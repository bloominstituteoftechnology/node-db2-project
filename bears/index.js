const express = require("express");

//init && db
const db = require("../data/dbConfig");
const server = express.Router();

//helper
const errHelper = (status, message, res) => {
  res.status(status).json({ message });
};
const getAllBears = async (req, res) => {
  try {
    const bears = await db
      .select()
      .from("bears")
      .orderBy("id", "desc");

    res.status(200).json(bears);
  } catch (err) {
    return errHelper(500, "internal server error", res);
  }
};

// @route    GET api/bears
// @desc     get all bears
// @Access   Public
server.get("/", (req, res) => {
  getAllBears(req, res);
});
// @route    GET api/bears/:id
// @desc     get single bear
// @Access   Public
server.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const bear = await db
      .select()
      .from("bears")
      .where({ id })
      .first();

    if (bear) {
      res.status(200).json(bear);
    } else {
      res.status(404).json({ message: "bear not found" });
    }
  } catch (err) {
    return errHelper(500, "internal server error", res);
  }
});
// @route    POST api/bears
// @desc     post single bear
// @Access   Public
server.post("/", async (req, res) => {
  const { name, zoo_id } = req.body;
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    await db
      .select()
      .from("bears")
      .insert({ name, zoo_id: 1 });

    getAllBears(req, res);
  } catch (err) {
    return errHelper(500, "internal error server ", res);
  }
});
// @route    DELETE api/bears/:id
// @desc    dlete bears
// @Access   Public
server.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await db
      .select()
      .from("bears")
      .where({ id })
      .del();

    if (deleted) {
      getAllBears(req, res);
    } else {
      res.status(404).json({ message: "no bear found with that id" });
    }
  } catch (err) {
    return errHelper(500, "internal error server", res);
  }
});
// @route    GET api/bears/:id
// @desc     update single bear
// @Access   Public
server.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updated = await db
      .select()
      .from("bears")
      .where({ id })
      .update({ name });

    if (updated) {
      getAllBears(req, res);
    } else {
      res.status(404).json({ message: "bear not found" });
    }
  } catch (err) {
    return errHelper(500, "server internal error", res);
  }
});

module.exports = server;
