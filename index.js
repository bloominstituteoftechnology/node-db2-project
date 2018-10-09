const express = require('express')
const helmet = require('helmet')
const zoosRoutes = require('./zoosRoutes/zoosRoutes.js')
const bearsRoutes = require('./bearsRoutes/bearsRoutes.js')
const server = express()
const port = 8000

server.use(helmet())
server.use(express.json())

server.use('/api/zoos', zoosRoutes)
server.use('/api/bears', bearsRoutes)

server.listen(port, () => console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`))
