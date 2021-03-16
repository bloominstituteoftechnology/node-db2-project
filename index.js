const server = require("./api/server");

const PORT = process.env.PORT || 9991;

server.listen(PORT, () => {
  console.log(`Port ${PORT} running!`);
});

module.exports = server
