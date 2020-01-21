const server = require('./server');
server.use(express.json())
server.get("/", function(request, response) {
    response.send({test:'This is a test'})
})
const port = 4000;
server.listen(port, () => console.log(`\n ** api on port: ${port} ** \n`));
