const server = require('./api/server.js')

const port = 3333;

server.listen(port, () => {console.log(`\n*** Server Running on Port: ${port} ***\n`)})