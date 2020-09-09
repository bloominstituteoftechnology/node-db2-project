//* import the server and assign a port *// 
const server = require('./api/server'); 

const port = process.env.PORT || 7000; 

//* turn the server on *// 
server.listen(port, () => console.log(`Running on port ${port} and all is well!` ));

