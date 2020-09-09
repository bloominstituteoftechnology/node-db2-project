//! this file is often seen named 'connection' as well !// 
//? Q: This is where we import knex and connect it to the .... what are we connecting it to? ?// 

const knex = require('knex'); 

const knexfile = require('../knexfile'); 

const environment = process.env.NODE_ENV || 'development'; 

module.exports = knex(knexfile[environment]); 