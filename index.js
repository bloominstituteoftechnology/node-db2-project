// endpoints here

const server = require('./server');

const port = process.env.PORT || 2000;

server.listen(port, function() {
	console.log(`server  Listening on port :${port} `);
});
