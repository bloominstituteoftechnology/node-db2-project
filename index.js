const server = require('./api/server');
const port = process.env.PORT || 7755;

server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
