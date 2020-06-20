const express = require("express");

const server = express();
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

const db = require('../data/dbconfig')

//GET Request async await ✅🏄🏽‍♂️
server.get("/async", async (req, res, next) => {
    try {
      const data = await db.select("*").from("cars");
      res.status(200).json({ data: data });
    } catch (error) {
      next(error);
    }
  });


//GET by :id async await✅🏄🏽‍♂️
server.get("/async/:id", async (req, res, next) => {
    try {
      const data = await db("cars").where({ id: req.params.id });
      if (data.length > 0) {
        res.json(data);
      } else {
        res.status(404).json({
          message: `User ${req.params.id} does not exist`,
        });
      }
    } catch (error) {
      next(err);
    }
  });

//POST async await ✅🏄🏽‍♂️
// create error handlers to catch missing fields, and catch unique fields
server.post("/async", async (req, res, next) => {
    try {
      const payload = req.body;
      console.log(req.body)
      const [dataID] = await db("cars").insert(payload, "id");
      const displayData = await db("cars").where({ id: dataID });
      res.status(201).json(displayData);
    } catch (error) {
      next(error);
    }
  });

//PUT async await ✅🏄🏽‍♂️
server.put("/async/:id", async (req, res, next) => {
  try {
    const payload = req.body;
    await db("cars").update(payload).where({ id: req.params.id });
    res.json({
      message: `Record succesfullyupdated`,
    });
  } catch (error) {
    next(error);
  }
});

//DELETE with asycn await ✅🏄🏽‍♂️
server.delete("/async/:id", async (req, res, next) => {
    try {
      await db("cars").where({ id: req.params.id }).del();
      res.json({message: `User ${req.params.id} successfully deleted`})
    } catch (error) { next(error)}
  });

//export your router
module.exports = server