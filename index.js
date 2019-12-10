const server = require('./api/server.js');

const PORT = process.env.PORT || 4005;

server.listen(PORT, () => {
  console.log(`Beep Beep on port ${PORT}...`);
});