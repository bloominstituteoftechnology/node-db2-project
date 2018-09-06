const express = require('express');
const helmet = require('helmet');
const morgan=require('morgan');
const server = express();

module.exports=server=>{
    server
        .use(express.json())
        .use(helmet())
        .use(morgan('dev'));
}