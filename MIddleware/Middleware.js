const   express = require('express'),
        helmet = require('helmet'),
        morgan = require('morgan'),
        Router = require('../Routers/router');
        

module.exports = (server) =>{
    server.use(
        express.json(),
        helmet(),
        morgan('dev')
    );
    server.use('/api/zoos', Router.routerZoos);
    server.use('/api/bears', Router.routerBears);
}
