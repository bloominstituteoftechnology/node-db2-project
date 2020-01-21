const port = 8675;

const server = require("./api/server.js");

server.listen(port, () =>
  console.log(`**********\nserver running on port: ${port}\n**********`)
);
