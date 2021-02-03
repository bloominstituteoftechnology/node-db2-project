require('dotenv').config();
const server = require('./api/server.js')

const PORT = process.env.PORT;

server.listen(port, () => {
    console.log(`\n*** server running on http://localhost:${port} ***\n`)
})