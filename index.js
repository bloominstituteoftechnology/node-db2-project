const server = require ('./server.js')

server.listen(8000, () => {
  console.log('\n*** Server Running on http://localhost:8000 ***\n');
});