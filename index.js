const server = require('./server/server.js');
const port = 5000;
server.listen(port, () => {
    console.log(`\nrunning server on http://localhost:${port}\n`)
})