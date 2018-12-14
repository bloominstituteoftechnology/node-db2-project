const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here


const PORT = 4444;

server.put('/api/zoos', (req,res) => {

})

server.put('/api/zoos:id', (req,res) => {
  
})

server.post('/api/zoos', (req,res) => {
  
})

server.put('/api/zoos:id', (req,res) => {
  
})

server.delete('/api/zoos:id', (req,res) => {
  
})

server.listen(PORT, function() {
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`);
});
