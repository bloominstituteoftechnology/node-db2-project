const express = require('express');
const helmet = require('helmet');
const zoohelpers = require("./dbhelpers/zoohelpers");

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/api", async (req, res) => {
  try {
    const results = await zoohelpers.get();
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err);
  }
});
// server.get("/api/:actionID", async (req, res) => {
//   if (!Number(req.params.actionID)) {
//     res.status(400).json({ errorMessage: "ID not a number" });
//   }
//   try {
//     const results = await actionsHelper.get(req.params.actionID);
//     res.status(200).json(results);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// server.delete("/api/:actionID", async (req, res) => {
//   if (!Number(req.params.actionID)) {
//     res.status(400).json({ errorMessage: "ID not a number" });
//   }
//   try {
//     const results = await actionsHelper.remove(Number(req.params.actionID));
//     if (results === 1) {
//       res.status(200).json({ message: "Success" });
//     } else {
//       res.status(500).json({ errorMessage: "Invalid ID for removal" });
//     }
//   } catch (err) {
    
//     res.status(500).json(err);
//   }
// });

// server.put("/api", async (req, res) => {
  
//   if (
//     !req.body.project_id ||
//     !req.body.description ||
//     !req.body.notes
//   ) {
//     res.status(400).json({ errorMessage: "Invalid body" });
//   }
//   try {
//     const results = await actionsHelper.insert(req.body);
//     res.status(200).json({ results });
//   } catch (err) {
    
//     res.status(500).json(err);
//   }
// });

// server.put("/api/:actionID", async (req, res) => {
  
//   if (
//     !req.body.project_id ||
//     !req.body.description ||
//     !req.body.notes
//   ) {
//     res.status(400).json({ errorMessage: "Invalid body" });
//     return;
//   }
//   if (!Number(req.params.actionID)) {
//     res.status(400).json({ errorMessage: "ID not a number" });
//     return;
//   }
//   try {
//     const results = await actionsHelper.update(req.params.actionID,req.body);
//     res.status(200).json({ results });
//   } catch (err) {
    
//     res.status(500).json(err);
//   }

// });


server.use("/", (req, res) =>
  res
    .status(404)
    .json({ errorMessage: "You probably want to use a different endpoint" })
);


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
