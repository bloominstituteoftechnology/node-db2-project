const express = require('express');
const port = 5555;
const server = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
//const knex = require('knex')


server.use(express.json());
server.use(helmet());
server.use(morgan('tiny'))
server.use(cors())

// const dbConfig = require('./knexfile')
// const db = knex(dbConfig.development)

const zoosRoutes = require('./Routes/zoosRoutes')
const bearsRoutes = require('./Routes/bearsRoutes')

server.use('/api/zoos', zoosRoutes);
server.use('/api/bears', bearsRoutes);

server.get('/', (req, res) => {
	res.send('API is working')
})

server.listen(port, () => console.log(`server running on port 5555`));
