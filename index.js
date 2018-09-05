const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const ZooRoutes = require("./zoo/ZooRoutes");

const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use("/api/zoos", ZooRoutes);

// endpoints here

server.get("/", (req, res) => {
  res.send("Root Route");
});

server.listen(3300, console.log("\n ==== WORKING ==== \n"));
