//states where the config file is for knex
const config = require('../knexfile');
//knex library
const knex = require('knex');
//execute and export
    //look inside knexfile.js, for key: development
module.exports = knex(config.development);

