const server = require("./api/server.js");

const port = process.env.PORT || 5600;
server.listen(port, () => console.log(`\n** server running on port ${port} **\n`));