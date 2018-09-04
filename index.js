const express = require('express');
const helmet = require('helmet');
const routes = require('./routes')

const app = express();

app.use(express.json());
app.use(helmet());

app.use('/api', routes)
// endpoints here

const port = 9000;
app.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
