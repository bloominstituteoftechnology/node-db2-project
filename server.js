const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('morgan');


//Instatiates a server(app) object
const app = express();

//Third party middleware
//express.json returns json objects of the response
//All global middlewares that will be used across enpoints must also be plugged into the app
//cors and helmet middlewares are not used
app.use(express.json(), logger('combined'), cors(), helmet());

//Root Request/Route Handler
app.get('/', (req, res) => {
    res.send('Test for root route')
});