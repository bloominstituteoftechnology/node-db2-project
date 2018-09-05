const express = require("express");
// const helmet = require("helmet");
// knex
// const knex = require("knex");
// const dbConfig = require("./knexfile");
// const db = knex(dbConfig.development);

const server = express();

// server.use(helmet());
// server.use(express.json());

// middleware
const configureMiddleware = require("./middleware/middleware.js");
configureMiddleware(server);

// endpoints here
/////// ZOOS ENDPOINTS START /////////
// // GET
// server.get("/api/zoos", (req, res) => {
//   db("zoos")
//     .then(zoos => {
//       res.status(200).json(zoos);
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The zoos could not be retrieved." });
//     });
// });

// server.get("/api/zoos/:id", (req, res) => {
//   const { id } = req.params;
//   db("zoos")
//     .where({ id })
//     .then(zoo => {
//       if (zoo.length === 0) {
//         res
//           .status(404)
//           .json({ message: "The zoo with the specified ID does not exist." });
//       } else {
//         return res.status(200).json({ zoo });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The zoo could not be retrieved." });
//     });
// });
// // end GET

// // start POST
// server.post("/api/zoos", (req, res) => {
//   const zoo = req.body;
//   if (!zoo.name) {
//     return res.status(406).json({
//       errorMessage: "Please provide a name for the zoo.",
//     });
//   } else {
//     db("zoos")
//       .insert(zoo)
//       .into("zoos")
//       .then(zoos => {
//         res.status(201).json({ message: "Zoo successfully added." });
//       })
//       .catch(err => {
//         res.status(500).json({ error: "The zoo could not be added." });
//       });
//   }
// });
// // end POST

// // start DELETE
// server.delete("/api/zoos/:id", (req, res) => {
//   const { id } = req.params;

//   db("zoos")
//     .where({ id })
//     .del()
//     .then(zoos => {
//       if (zoos === 0) {
//         res.status(404).json({
//           message: "The zoo with the specified ID does not exist.",
//         });
//       } else {
//         res.status(200).json({ message: "Zoo removed successfully." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The zoo could not be removed." });
//     });
// });
// // end DELETE

// // start PUT
// server.put("/api/zoos/:id", (req, res) => {
//   const { id } = req.params;
//   const newName = req.body.name;
//   if (!newName) {
//     return res.status(406).json({
//       errorMessage: "Please provide a name for the zoo.",
//     });
//   } else {
//     db("zoos")
//       .where({ id })
//       .update({ name: newName })
//       .then(zoos => {
//         res.status(200).json({ message: "Zoo successfully modified." });
//       })
//       .catch(err => {
//         res.status(500).json({ error: "The zoo could not be updated." });
//       });
//   }
// });
// // end PUT
/////// ZOOS ENDPOINTS END /////////

/////// BEARS ENDPOINTS START /////////
// GET
// server.get("/api/bears", (req, res) => {
//   db("bears")
//     .then(bears => {
//       res.status(200).json(bears);
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The bears could not be retrieved." });
//     });
// });

// server.get("/api/bears/:id", (req, res) => {
//   const { id } = req.params;
//   db("bears")
//     .where({ id })
//     .then(bear => {
//       if (bear.length === 0) {
//         res
//           .status(404)
//           .json({ message: "The bear with the specified ID does not exist." });
//       } else {
//         return res.status(200).json({ bear });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The bear could not be retrieved." });
//     });
// });
// // end GET

// // start POST
// server.post("/api/bears", (req, res) => {
//   const bear = req.body;
//   if (!bear.name) {
//     return res.status(406).json({
//       errorMessage: "Please provide a name for the bear.",
//     });
//   } else {
//     db("bears")
//       .insert(bear)
//       .into("bears")
//       .then(bears => {
//         res.status(201).json({ message: "Bear successfully added." });
//       })
//       .catch(err => {
//         res.status(500).json({ error: "The bear could not be added." });
//       });
//   }
// });
// // end POST

// // start DELETE
// server.delete("/api/bears/:id", (req, res) => {
//   const { id } = req.params;

//   db("bears")
//     .where({ id })
//     .del()
//     .then(bears => {
//       if (bears === 0) {
//         res.status(404).json({
//           message: "The bear with the specified ID does not exist.",
//         });
//       } else {
//         res.status(200).json({ message: "Bear removed successfully." });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ error: "The bear could not be removed." });
//     });
// });
// // end DELETE

// // start PUT
// server.put("/api/bears/:id", (req, res) => {
//   const { id } = req.params;
//   const newBear = req.body.name;
//   if (!newBear) {
//     return res.status(406).json({
//       errorMessage: "Please provide a name for the bear.",
//     });
//   } else {
//     db("bears")
//       .where({ id })
//       .update({ name: newBear })
//       .then(bears => {
//         res.status(200).json({ message: "Bear successfully modified." });
//       })
//       .catch(err => {
//         res.status(500).json({ error: "The bear could not be updated." });
//       });
//   }
// });
// // end PUT
// /////// BEARS ENDPOINTS END /////////

// end endpoints
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
