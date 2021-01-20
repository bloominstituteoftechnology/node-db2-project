const express = require('express');

const CarRouter = requre('./db/carRouter');
const server = express();

server.use(express.json());
server.use(CarRouter);

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});