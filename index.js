const server = require('./api/server');

// port
const port = process.env.PORT || 4000;

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`))