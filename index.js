// NODE MODULES
// ==============================================
const express = require('express');
const helmet = require('helmet');

// FILE IMPORTS, CONSTANTS
// ==============================================
const zooRouter = require('./routes/zooRoutes');
const port = 3300;

const server = express();

// MIDDLEWARE
// ==============================================
server.use(express.json());
server.use(helmet());

// ROUTES
// ==============================================
server.use('/api/zoos', zooRouter);

// START THE SERVER
// ==============================================
server.listen(port, () => console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`));
