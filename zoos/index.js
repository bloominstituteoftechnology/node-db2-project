const express = require("express");

//init router & db
const db = require("../data/dbConfig");
const server = express.Router();

//helper
const errHelper = (status, message, res) => {
  res.status(status).json(message);
};
const getAllZoos = async (req, res) => {
  try {
    const zoos = await db
      .select("z.*")
      .from("zoos as z")
      .orderBy("id", "desc");
    res.status(200).json(zoos);
  } catch (err) {
    return res.errHelper(500, "internal server err", res);
  }
};

// @route    GET api/zoos
// @desc     get all zoos
// @Access   Public
server.get("/", (req, res) => {
  getAllZoos(req, res);
});

// @route    POST api/zoos
// @desc     post one zoos
// @Access   Public
server.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await db
      .select()
      .from("zoos")
      .insert({ name });

    getAllZoos(req, res); //async
  } catch (err) {
    return errHelper(500, "internal server err", res);
  }
});

// @route    GET api/zoos/:id
// @desc     get by id
// @Access   Public
server.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const zoos = await db
      .select()
      .from("zoos")
      .where({ id })
      .first();
    if (zoos) {
      res.status(200).json(zoos);
    } else {
      res.status(404).json({ message: "zoo not found" });
    }
  } catch (err) {
    return errHelper(500, "internal server err", res);
  }
});

// @route    DELETE api/:id
// @desc     delete a sing zoo
// @Access   Public
server.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await db
      .select()
      .from("zoos")
      .where({ id })
      .del();

    if (deleted) {
      getAllZoos(req, res);
    } else {
      res.status(404).json({ message: "zoo not found" });
    }
  } catch (err) {
    return errHelper(500, "internal server err", res);
  }
});

// @route    GET api/zoos/:id
// @desc     update one zoo
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
      .from("zoos")
      .where({ id })
      .update({ name });

    //console.log(udpated); count or 0
    if (updated) {
      getAllZoos(req, res);
    } else {
      res.status(404).json({ message: "zoo not found" });
    }
  } catch (err) {
    return errHelper(500, "internal error server", res);
  }
});

module.exports = server;
