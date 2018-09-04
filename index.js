const express = require("express");
const helmet = require("helmet");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(require("./middlewares/index").assignTable);

// endpoints here
server.use("/api/zoo", require("./routes/ZooRoute"));
server.use("/api/bear", require("./routes/BearRoute"));

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
