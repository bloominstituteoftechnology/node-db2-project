const server = require('./api/server.js')
const port = process.env.PORT || 8083;
server.listen(port,() =>console.log(`\n*** Running on port ${port} \n`))
